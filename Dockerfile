FROM nginx

MAINTAINER Lucas Teske <lucas@teske.com.br>

RUN mkdir -p /var/www/

COPY . /var/www/

RUN chmod 777 -R /var/www/
RUN rm /var/www/geradordecnpj.conf

WORKDIR /opt
COPY geradordecnpj.conf /etc/nginx/conf.d/default.conf