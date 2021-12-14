FROM node:16

WORKDIR /mapper

RUN apt update
RUN apt -y upgrade
RUN apt install -y build-essential libssl-dev libffi-dev python3-dev python3-pip


COPY ./TER-base-donnée/mapper/mapper.py /mapper/
COPY ./TER-base-donnée/mapper/requirements.txt /mapper/

RUN pip3 install -r requirements.txt


WORKDIR /app

COPY ./backend /app/

RUN npm ci 
EXPOSE 3000

RUN ls /app

CMD [ "npm", "run", "start:prod" ]