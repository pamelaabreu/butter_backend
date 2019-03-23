[![Build Status](https://travis-ci.org/pamelaabreu/butter_backend.svg?branch=master)](https://travis-ci.org/pamelaabreu/butter_backend) [![Coverage Status](https://coveralls.io/repos/github/pamelaabreu/butter_backend/badge.svg?branch=master)](https://coveralls.io/github/pamelaabreu/butter_backend?branch=master) [![Heroku](http://heroku-badge.herokuapp.com/?app=butterbackenda&style=flat)](https://butter-backend.herokuapp.com/)

# Butter Backend Deployment App

 ## Running Locally

 ```
$ npm run start:local
```

 This will start the app but in a background process. To kill the process, run:

 ```
$ ps | grep node
```

 Inspect the output and run 

 ```
$ kill -9 [PID]
```

Where `PID` references each process that is running node or nodemon.

## Testing

 To test, run:

 ```
$ npm test
```

 This will run jest assertions against application code and generate code coverage reports. To view the HTML report,

 ```
$ open coverage/index.html
```

 This will open reporter in default browser.
