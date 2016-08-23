FROM node:slim
MAINTAINER Riyaz Walikar <riyaz@appsecco.com>

RUN mkdir -p /usr/src/app
RUN npm install -g pm2

COPY app.js /usr/src/app
COPY package.json /usr/src/app

WORKDIR /usr/src/app
RUN npm install

EXPOSE 8080
CMD ["pm2","startup"]
CMD ["pm2","stop","app"]
CMD ["pm2","start","app.js","--name","app","--no-daemon"]