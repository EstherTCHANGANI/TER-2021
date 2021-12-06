FROM node:16

WORKDIR /app

COPY ./backend /app/

RUN npm ci 
EXPOSE 3000

RUN ls /app

CMD [ "npm", "run", "start:prod" ]