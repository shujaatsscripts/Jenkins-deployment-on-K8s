#!/bin/sh

echo Start Deploying
echo Pulling Code...

git pull

echo Installing modules...

npm install

echo Building production build

npm run build

echo Copying files

sudo rm -r /var/www/dev-webapp.3cix.com/*
sudo cp -r build/* /var/www/dev-webapp.3cix.com

sudo systemctl restart nginx
