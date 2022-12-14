const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  process.env.MONGO_URL,
  (error, mongoConnectionInstance) => {
    if (error) throw Error('Mongoose Connection!!, Error: ' + error);
    if (!process.env.NODE_ENV) {
      const { host, port, name } = mongoConnectionInstance;
      console.log({ host, port, name });
    }
  }
);
