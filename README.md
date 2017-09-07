# <img alt="ironhelp" src="https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/4001613/ironhelp-logo--green.png" height="56" width="350">

An app to help Ironhackers with finding the "real" documentation for technologies we use, solve common development issues (Gotchas) and share awesome solutions (Awesomes).

The MVP of this project was built in **one week of pair programming**, as part of the **Ironhack Web Development Bootcamp in Barcelona** (at the end of module 2, week 6 of the program).

There are a lot of things we would like to implement and improve. All is listed in a Trello board we can share.

Here is a quick presentation of the project made for the demo day: [slides.com](https://slides.com/denisbarriere/ironhelp/live#)

Finally, the project is deployed to Heroku and is accessible [here](https://ironhelp.herokuapp.com)


## Concept

### Docs: "Real" documentation

The idea came from a pain we all experienced during Ironhack bootcamp. When we had to find things by reading the official documentations for a technology and were not able to find proper examples. In that case, we had to Google what we were trying to achieve and almost always were ending up on stackoverflow.

"Real" documentation are detailed explanations of things with concrete, real life examples.

We later found out that [stackoverflow](ADD URL HERE) had the same idea to build a documentation reference, powered by the community and driven by actual examples. Their project was at the BETA phase when the MVP was built.

### Gotchas

A gotcha are tips to help you troubleshoot common problems quickly. For instance, "I got this issue with mongoDB... on my local". The related goatcha would be "did you check mongoDB is running on your local machine?"

### Awesomes

An awesome is a cool thing that can be done with a specific technology, shared by a user.

Please have a look at the production data to get a clearer picture of docs, gotchas and awesomes.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Have Node.js installed. Please see [here](https://nodejs.org/en/download/package-manager/) for more installation instructions.
2. Have mongoDB installed.

### Installing

1. Download the .zip package or clone the project to your local machine
* If you download the .zip file, please extract it to a local directory on your machine 

2. Run the 'npm install' command in your terminal
3. Create .env file in the root folder. It should include:
* the URI of your local database
* the default admin password for your user seed file
* session duration

Here is an example:

```
MONGODB_URI=mongodb://localhost/ironhelp
MONGODB_ADMIN_PWD=test123
COOKIE_MAX_AGE=6000000
```

4. Start mongoDB locally with the following comamnd line in your terminal: start_mongo
5. Start the by running the following command line in another terminal: 'npm start' or 'npm run start-dev' to run the app with nodemon, so that you don't have to restart the app each time you make a change. 

6. Seed data in the following order:
* categories
* tools
* admin users
* posts - please set the right ObjectIDs (found in your local DB) for 'user', 'category' and 'tool' prior to excecution

To run the seeds: node ./bin/<seed filename> (e.g. node ./bin/seed-users.js)

You are now good to go. You can access the app locally in your web browser at the following URL: [http://localhost:3000/](http://localhost:3000/)

You can create as many users, posts, categories and tools as you want in your local.

## Deployment

The project is deployed to Heroku and is accessible [here](https://ironhelp.herokuapp.com). 
Please contact us for deploying new contributions.


## Built With

* [Node.js](https://nodejs.org) - as the JavaScript runtime environment
* [Express](https://expressjs.com/  ) - as the web application framework
* [Ejs Layouts](https://github.com/Soarez/express-ejs-layouts) - as the layouts engine for Express
* [mongoDB](https://www.mongodb.com/) - as the database program
* [mongoose](http://mongoosejs.com/) - as the mongodb object modeling framework for Node.js
* [Passport](http://passportjs.org/) - as the autehtification service for Node.js
* [Vue.js](https://vuejs.org/) - used to perform more complex tasks that ejs-layout could not easily
* [jQuery](https://jquery.com/) - used for accessing elements on pages
* [Bulma](http://bulma.io/) - as the CSS framework based on Flexbox 
* [Font Awsome](http://fontawesome.io/) - used for displaying quality icons on any screen resolution and size

## Code Quality

[![DeepScan Grade](https://deepscan.io/api/projects/395/branches/609/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=395&bid=609)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/denisbarriere/ironhelp/tags). 

## Authors

* **Denis Barriere** - *Initial release* - [denisbarriere](https://github.com/denisbarriere)
* **JB Tellez Barriere** - *Initial release* - [JB-Tellez](https://github.com/JB-Tellez)

See also the list of [contributors](https://github.com/denisbarriere/ironhelp/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License 2017 - see the LICENSE.md file for details
 - see [LICENCE.md](LICENCE.md) for more details.

## Acknowledgments

* Thanks to Ironhack’s module 2 teachers’ ([Thor Jubera Albo](https://github.com/zapatran) and [Tair Assimov](https://github.com/assimovt)) and TAs’ support during this intense week 6.
* Thanks Ironhack for pairing Denis and JB for this project, it was a great match and lovely experience!
