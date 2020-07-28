# WaitList

React web app for a restaurant host to organize and prioritize guests on a waitlist and tables in the restaurant. This app also aims to track and calculate data to pertaining to wait times and turnover rate to provide a better customer experience and a deeper understanding of your restaurant's turnover efficiency.

Motivation for this app comes from years of restaurant work experience, where I wish I had a tool to help multitasking while managing the floor and hosting busy brunch or dinner service. I wanted to create an app that would provide useful data to the host regarding wait times and table turnover rates, as well as keeping track of guests on a waitlist and the availability of tables.

## Development

1. Follow the [API installation instructions](https://github.com/rotondozer/waitlist-api#installation) to create a db and run a local server. ***Login is required!*** 
1. Verify API authentication working using a [shell script](https://github.com/rotondozer/waitlist-api/blob/master/scripts/sign-up.sh) to create an account.
1. Install dependencies with `npm install`
1. `npm start` to launch the client server in a different port. You should now be able to login with the user you created in step 2.

## Demo

Visit the [deployed example](https://waitlist-client.herokuapp.com) and sign in with:
```
username: admin 
password: admin
``` 
***Login is required!***

 From here, you can play around with adding parties to the waitlist, seating them, checking the availability of tables, etc. without having to create a new database (i.e. create a new restaurant example).

