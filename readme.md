# Setup
Please execute this code in an environment with node.js
```
$ npm install
$ node index.js
```

# Config
## .env File
Please add a .env file with fields in the example below
```
# DB
DB_HOST=localhost
DB_USER=root
DB_PWD=dolphin
DB_NAME=imbee

# MQ
MQ_HOST=amqp://localhost

# FIREBASE
FIREBASE_KEY=firebase-key.json
```

## Private key for Firebase admin SDK
Set the key file path in .env file