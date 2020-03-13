FROM node:13-alpine

RUN mkdir /backend
WORKDIR /backend

COPY package.json yarn.lock /backend/
RUN yarn --pure-lockfile

COPY . .

RUN yarn lint
RUN yarn test
RUN yarn build

CMD ["yarn", "start"]
