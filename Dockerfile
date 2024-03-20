FROM node:16-bullseye
RUN apt-get update && \
    apt-get install -y \
    bash \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN npm install nodemon --global
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 8081
CMD [ "bash", "./docker/run.sh" ]