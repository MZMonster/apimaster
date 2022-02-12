FROM node:8

MAINTAINER Liuxing <shanejs@163.com>

expose 7002

ENV LANG="C.UTF-8" \
    TZ="UTC-8" \
    NODE_ENV="production"

WORKDIR /data/work/

#加入node程序并安装npm包
ADD ./ ./
RUN set -ex \
  && npm install -g cnpm --registry=https://registry.npmmirror.com \
  && cnpm install

CMD node app.js 
