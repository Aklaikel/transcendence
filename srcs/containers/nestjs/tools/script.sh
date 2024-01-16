#!/bin/bash

cd  /home/back-end
npm cache clean --force
npm install --legacy-peer-deps
npm run start:dev