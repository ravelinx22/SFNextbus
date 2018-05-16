# SFNextbus

## Creative Component

For this project I added a list of the most searched agencies in the page so that people can now which of them are the most popular, also the user has a spinner to indicate that the search is being loaded every time the searches for a route.

## Bugs Fixed

The bugs I found in the D3 code provided were the following:

- When finding the min date the code used buses[1], this was incorrect because the bus in the position buses[0] leaves earlier than the second bus having a smaller date.
- When trying to add 24 hours to the min date the code added 22 * 60 * 60 * 1000 so it was adding 22 hours in reality. To fix this it was necessary to change de 22 to 24. 


## Deployment

You can find the web app here http://sfnextbus.herokuapp.com/. If you want to run locally the project you must follow the next steps.

#### Clone the repository
```
git clone https://github.com/ravelinx22/CoderHunt.git
```
#### Install dependencies
```
cd SFNextbus
meteor npm install
```
#### You need to create a file named settings.json with the Twitter API keys as follows:

```
{
	"CONSUMER_KEY": "---------------",
	"CONSUMER_SECRET": "------------------",
}
```
#### Run the project
```
meteor --settings settings.json
```

The project runs in http://localhost:3000/

## Technologies

- Meteor
- React
- D3
- NPM
- Nextbus API

