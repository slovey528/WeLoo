#!/bin/bash
#Instruction: to properly start the service, you need to have UWAPI Key, WEIXIN Token and MONGO Database URI
#Replace corresponding values below with yours
#Execute this script to set Heroku env
#Refer to what's below for local test 
heroku config:set UW_API_TOKEN=YOUR_UW_API_TOKEN_GOES_HERE
heroku config:set WX_TOKEN=YOUR_WEIXIN_TOKEN_GOES_HERE
heroku config:set MONGO_TEST_URI=mongodb://sample:sample@sample.mongohq.com:10087/app_sample
heroku config:set MONGO_PROD_URI=mongodb://sample:sample@sample.mongohq.com:10087/app_sample
heroku config:set YELP_CONSUMER_KEY=YOUR_YELP_CONSUMER_KEY_GOES_HERE
heroku config:set YELP_CONSUMER_SECRET=YOUR_YELP_CONSUMER_SECRET_GOES_HERE
heroku config:set YELP_TOKEN=YOUR_YELP_TOKEN_GOES_HERE
heroku config:set YELP_TOKEN_SECRET=YOUR_YELP_TOKEN_SECRET_GOES_HERE
heroku config:set WEATHER_API_TOKEN=YOUR_WEATHER_API_TOKEN_GOES_HERE

#for local test, do this instead of make start:
#make start UW_API_TOKEN=WEIXIN_TOKEN_GOES_HERE  MONGO_TEST_URI=mongodb://sample:sample@sample.mongohq.com:10087/app_sample
