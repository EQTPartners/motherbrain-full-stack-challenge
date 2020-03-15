FROM node:13-alpine AS builder

ENV CI=true

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

RUN yarn lint
RUN yarn test
RUN yarn build

CMD ["yarn", "serve"]
