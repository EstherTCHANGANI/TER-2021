FROM node:17

WORKDIR /bin/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

# ENV PORT=8080
# ENV DB_URL=mongodb+srv://ter:qlvM5Ma2WlfNJdBB@cluster0.kpktr.mongodb.net/ter?retryWrites=true&w=majority
# ENV DB_NAME=ter

CMD ["npm", "run", "start:prod"]