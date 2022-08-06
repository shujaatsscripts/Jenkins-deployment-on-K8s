#!/bin/bash

sudo cp /etc/nginx/site-available/default /etc/nginx/site-available/default.backup
sudo cp nginx-conf /etc/nginx/site-available/default
sudo systemctl restart nginx