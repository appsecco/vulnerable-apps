# Damn Vulnerable Node Application
# Original project in github is https://github.com/quantumfoam/DVNA
#
# docker run -p 3000:3000 -d appsecco/dvna
#

FROM node:slim
MAINTAINER Madhu Akula <madhu@appsecco.com>

# Installing unzip package because we will downloading zip in the next step
RUN apt-get update && apt-get install -y unzip --no-install-recommends

# Damn Vulnerable Node Application release hosted on Github
RUN wget https://github.com/quantumfoam/DVNA/archive/master.zip; unzip master.zip; rm master.zip

WORKDIR /DVNA-master

# Installing node package pm2 for process management
RUN npm install -g pm2

# Installing the dependencies of DVNA using Node Package Manager(npm)
RUN npm set progress=false
RUN npm install

# Choose the port which ever works for you
EXPOSE 3000

# Adding pm2 to startup programs and starting the dvna application
CMD ["pm2", "startup"]
CMD ["pm2", "stop", "dvna"]
CMD ["pm2", "start", "dvna.js", "--name", "dvna", "--no-daemon"]
