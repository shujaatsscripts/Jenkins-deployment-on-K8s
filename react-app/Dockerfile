# Build Enviroment
FROM 3cixcontainers.azurecr.io/node:14 as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

#Production Enviroment

FROM 3cixcontainers.azurecr.io/nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN echo "healthy" >> health.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
