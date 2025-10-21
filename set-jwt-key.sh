#!/bin/bash

# Read the JWT key value
JWT_KEY=$(cat final-jwt-key.txt)

# Set in production
npx convex env set JWT_PRIVATE_KEY "$JWT_KEY" --prod

# Set in development
npx convex env set JWT_PRIVATE_KEY "$JWT_KEY"
