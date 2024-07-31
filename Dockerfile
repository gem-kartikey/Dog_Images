# FROM node:20.13.1 AS builder

# WORKDIR /build

# COPY package.json . 

# RUN npm install

# FROM node:20.13.1-alpine 

# WORKDIR /app

# COPY --from=builder /build .

# COPY . .

# CMD ["node" , "app.js"]

# EXPOSE 4000


FROM node:20.13.1

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "node" ,"app.js"]