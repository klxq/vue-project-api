#!/bin/bash
set -e

echo "Starting mongo"

# run mongo server
mongod --fork --logpath ./mongo.log

echo "Starting API"

# run aip server
npm run server

echo "Started!"
