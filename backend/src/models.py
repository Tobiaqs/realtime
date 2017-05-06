from app import db
from dateutil import parser, tz
import datetime
import jwt
import os


class Collection():
    def __init__(self, models=[]):
        self.models = models

    def __len__(self):
        return len(self.models)

    def dump(self):
        return [m.dump() for m in self.models]


class Base(object):
    def __init__(self, data, currentUser=None):
        self.parse(data, currentUser)

    def parse(self, data, currentUser=None):
        for col in self.__table__.columns:
            key = col.name

            # If it is a foreign key, we check the input for the key without `_id`
            # EG if we are at col 'project_id' and it is a fk, we check the input for `project`
            if len(col.foreign_keys):
                assert key.endswith('_id')
                # Split the keyname in _, throw away the last part (_id) and join the rest
                key = '_'.join(key.split('_')[:-1])
                if key in data:
                    setattr(self, key + '_id', data[key])
                    continue

            if key in data:
                if str(col.type) == 'DATETIME' and data[key] is not None:
                    data[key] = parser.parse(data[key])

                setattr(self, key, data[key])

    def __repr__(self):
        return '<Model %r>' % self.id

    def dump(self):
        data = {}
        for col in self.__table__.columns:
            key = col.name
            val = getattr(self, key)

            # Return {'project': id} instead of {'project_id': id}
            if len(col.foreign_keys):
                assert key.endswith('_id')
                key = '_'.join(key.split('_')[:-1])

            if str(col.type) == 'DATETIME' and val is not None:
                # Make aware and format as iso
                val = val.replace(tzinfo=tz.tzlocal()).isoformat()

            data[key] = val
        return data

    @classmethod
    def find(cls, session, scope):
        query = session.query(cls)

        for col in cls.__table__.columns:
            key = col.name

            if key in scope:
                val = scope[key]
                query = query.filter_by(**{key: val})
                # from pudb import set_trace; set_trace()
                continue

            # Translate 'project_id' to 'project', a relation key shorthand
            if len(col.foreign_keys):
                assert key.endswith('_id')
                keyRelShorthand = '_'.join(key.split('_')[:-1])
            else:
                continue

            if keyRelShorthand in scope:
                val = scope[keyRelShorthand]
                query = query.filter_by(**{key: val})
                continue

        # from pudb import set_trace; set_trace()
        return Collection(query.all())


class Entry(Base, db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime)
    ended_at = db.Column(db.DateTime)
    description = db.Column(db.Text())

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='cascade'))
    project = db.relationship('Project',
        backref=db.backref('entries', lazy='dynamic', cascade='all, delete-orphan'))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='cascade'))
    user = db.relationship('User',
        backref=db.backref('entries', lazy='dynamic', cascade='all, delete-orphan'))

    def parse(self, data, currentUser=None):
        if currentUser:
            data['user'] = currentUser['id']

        return super(Entry, self).parse(data)


class Project(Base, db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(200))


class User(Base, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    username = db.Column(db.String(50))
    display_name = db.Column(db.String(50))
    avatar_url = db.Column(db.String(300))

    def create_session(self):
        secret = os.environ.get('CY_SECRET_KEY')
        payload = self.dump()
        payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(weeks=8)
        return jwt.encode(payload, secret, algorithm='HS256').decode('utf-8')

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)
