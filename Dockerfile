FROM node:16 AS builder
LABEL stage=npmbuilder
WORKDIR /build
ADD package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /build/dist /app
EXPOSE 80/tcp 443/tcp