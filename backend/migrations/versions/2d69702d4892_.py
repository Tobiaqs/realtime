"""empty message

Revision ID: 2d69702d4892
Revises: 4be545224f47
Create Date: 2018-09-16 17:52:32.244719

"""

# revision identifiers, used by Alembic.
revision = '2d69702d4892'
down_revision = '4be545224f47'

from alembic import op
import sqlalchemy as sa


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('is_active', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('projects', 'is_active')
    # ### end Alembic commands ###
