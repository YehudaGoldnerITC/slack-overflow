const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const route = require('./routers/index');
const port = process.env.PORT || 1248;
const publicDirectoryPath = path.join(__dirname, 'client/build');

app.use(express.json());
app.use(cors());
app.use(express.static(publicDirectoryPath));
app.use('/api', route);
app.post("/c", (req, res)=>{
  console.log(1234, req.body);
  res.status(200).send(req.body.challenge)
})
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'index.html'));
});

app.listen(port, () => {
  console.log('listen to port -> ', port);
});

if (process.env.SSL_PRIVATE_KEY) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    },
    app
  );

  httpsServer.listen(443);
}
