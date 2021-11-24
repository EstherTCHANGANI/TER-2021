FROM python:3-alpine
WORKDIR /mapper

COPY ./mapper.py ./main.py
COPY mapping.json ./mapping.json
COPY source.json ./source.json

RUN "python mapper.py"
