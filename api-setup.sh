#!/bin/bash

# Login and get access token
TOKEN=$(curl -s -X POST http://localhost:8055/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"M-tVNpEzBFJ2"}' | \
  node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8')).data.access_token")

echo "Got token: $TOKEN"

# Update admin user
curl -s -X PATCH http://localhost:8055/users/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"agency@theportlandcompany.com","password":"J9u76asecdst!"}'

echo "Admin user updated"

echo "Setup completed!"