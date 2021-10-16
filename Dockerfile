FROM node:16 as builder

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . .
RUN yarn build

RUN mkdir -p /workspace/formatter-snap

FROM node:16-alpine

WORKDIR /opt/snap
COPY --from=builder /app/dist /opt/snap/dist
COPY --from=builder /app/package.json /opt/snap
COPY --from=builder /app/yarn.lock /opt/snap
RUN yarn install --production

RUN mkdir -p /workspace/qonto-snap

CMD ["yarn", "start"]
