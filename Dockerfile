FROM reg.qloudhub.com/qloudbase/node:10.19.0
EXPOSE 8888
RUN npm install -g pm2        
ADD universal.tgz /usr/opt
RUN mkdir -p /app/log
STOPSIGNAL 2
WORKDIR  /usr/opt/
CMD ["/bin/sh", "-c", "/usr/local/bin/pm2-runtime  ecosystem.config.js"]