#!/bin/bash

# Your API URL
API_URL="http://localhost:3000/api"

# Replace 'your_token_here' with a valid authentication token
AUTH_TOKEN=""

# POST request to add sample data
echo "Adding sample data..."
curl -X POST "${API_URL}/add-sample-data" \
  -H "Authorization: ${AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "email": "johndoe@example.com"
  }'
echo

# GET request to retrieve sample data
echo "Getting sample data..."
curl -X GET "${API_URL}/get-sample-data" \
  -H "Authorization: ${AUTH_TOKEN}"
echo
