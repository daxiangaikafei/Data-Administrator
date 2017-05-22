FROM node
ADD app.tar.gz /user/src/node-server/
WORKDIR "/user/src/node-server"
RUN ls
RUN pwd
RUN ls app/
WORKDIR "/user/src/node-server/app"
RUN pwd
RUN ls *
RUN npm i nrm -g \
     && nrm use taobao \
     && npm i typescript pm2 -g \
     && npm install 
RUN ls *
RUN ["tsc","--project","tsconfig.json"]
RUN ls app/*
RUN ls *
# RUN export NODE_ENV=production
# RUN ["pm2","start","/user/src/node-server/app/app/app.js"]
# RUN ["pm2","list"]