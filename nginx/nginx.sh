#!/bin/bash

sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup
sudo cp ./nginx/nginx-conf /etc/nginx/sites-available/default
sudo systemctl restart nginx
