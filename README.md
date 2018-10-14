# Spotify Rooms

A social media app centered around music. Built with sqllite, flask and react.

## To run in development mode

### Initialize venv

. ./venv/bin/activate

### Initialize env variables

- export FLASK_APP=flaskr
- export FLASK_ENV=development

### Initialize DB

flask init-db

### Set up app config

Create a file names config.py in the flaskr/ directory with the following format - 
```
config = {}
config['client_id'] = "<< Spotify Client ID >>"
config['client_secret'] = "<< Spotify Client Secret >>"
```

### Run server

flask run

### Run client

cd ./flaskr/client
npm run start
