# WaitList
by Nick Rotondo

An app for a restaurant host to organize and prioritize guests on a waitlist and tables in the restaurant. This app also aims to track and calculate data to pertaining to wait times and turnover rate to provide a better customer experience and a deeper understanding of your restaurant's turnover efficiency.

### Use
No installation necessary. Just head to https://waitlist-client.herokuapp.com create an account and begin use. *Note that all user actions require authentication, so you will not be able to use the app without signing in.*

### Technologies
**ReactJS**
Client side framework.
**Axios**
Promise based HTTP client for the browser
**Ruby on Rails**
API
**PostgreSQL**
Database

### Wireframes
Sketched page 1:
[Imgur](https://i.imgur.com/uumGBCy.jpg?1)
Sketched page 2:
[Imgur](https://i.imgur.com/2Nm4wck.jpg?1)

### User Stories
- As a host, I want a list of all available tables.
- As a host, I want a list of all unavailable tables with the times they were sat, to determine what tables will likely be available in order.
- As a host, I would benefit from having an average turnover time for each table, to better quote wait times to guests.
- As a host, I want to see how many guests each table can sit so I can appropriately seat guests.
- As a host, I want to see a full list of guests waiting for tables in the order they checked in.
- As a host I would like to see the estimated time I quoted compared to the actual time difference to provide a better experience.
- As a host, I want to be able to what time a guest has checked in and how long of a wait time i quoted them, to provide guests with accurate wait times.
- When there is an active waitlist to be seated and a table opens up, as a host I need to see the next party in queue (earliest time checked in) that also fits within the maximum and minimum number of guests a table can seat.

### Approaching this Project
For this app, I'm pulling in my years of restaurant management experience to make something I would have wanted for myself when I was hosting busy brunch or dinner service. I wanted to create an app that would provide useful data to the host regarding wait times and table turnover rates, as well as keeping track of guests on a waitlist and the availability of tables.

This being my first **React** project, I knew getting comfortable with the front-end was going to take some time. I made sure to give myself plenty of time to work through bugs and simply stalling out when working with a new technology. I usually try to get my API logic exactly where I wanted it before even touching the front-end, but this time I spent time on each from the beginning.

My database structure took a few ERDs to get right. That was a bit time consuming at first. After that I began customizing my Rails API with all the controller methods I would need. When it came to the React client, as always, functionality came before design.

### Future Iterations
As this project evolves, I aim to take advantages of all the routes I have set up for accessing and calculating useful information for a restaurant host. This version is in its simplest functionality. As I progressed through my initial version of this app, I became more aware of how I would plan modularity and disperse the responsibilities of components. There is much more to React I want to take advantage of.

### API
Deployed: https://waitlist-api.herokuapp.com
Repository: https://github.com/rotondozer/waitlist-api
