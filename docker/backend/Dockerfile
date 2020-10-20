FROM debian:stretch-20200908-slim

# Special postgresql hack: https://github.com/debuerreotype/debuerreotype/issues/10#issuecomment-438342078
RUN mkdir -p /usr/share/man/man1 && \
    mkdir -p /usr/share/man/man2 && \
    mkdir -p /usr/share/man/man3 && \
    mkdir -p /usr/share/man/man4 && \
    mkdir -p /usr/share/man/man5 && \
    mkdir -p /usr/share/man/man6 && \
    mkdir -p /usr/share/man/man7 && \
    mkdir -p /usr/share/man/man8

RUN apt-get update -qq && \
    apt-get install -qq --no-install-recommends git libjpeg-dev libpq-dev gettext binutils libproj-dev gdal-bin python-virtualenv postgresql-client openssh-server python3 python3-pip python3-dev gcc python3-setuptools locales gosu > /dev/null && \
    rm -rf /var/cache/apk/* && \
    update-alternatives --install /usr/bin/python python /usr/bin/python2.7 1 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3.5 2

RUN mkdir /run/sshd



# Set default timezone to Europe/Amsterdam.
RUN ln -fs /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

# App deps + src.
COPY backend/packages.pip /packages.pip
RUN pip3 install -qUr packages.pip
COPY docker/backend/runit /
COPY docker/entrypoint.sh /entrypoint.sh
COPY backend/ /backend
WORKDIR /backend

# Run app.
EXPOSE 8000/tcp
ENTRYPOINT ["/runit"]
