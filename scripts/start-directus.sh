#!/bin/bash
cd /Users/spencerhill/Sites/leonard-soda-blasting
export $(cat .env | xargs)
npx directus start