let express = require('express');
let app = express();
// app.use(express.static("app-project2")); // myApp will be the same folder name.
/*app.get('/', function (req, res,next) {
 res.redirect('/');
});*/
app.use(express.static(__dirname + '/dist/AppProject2'));
// app.get('*', function(req, res) {
app.get('*', (req, res) => {
  res.sendfile('./dist/AppProject2/index.html');
  // load the single view file (angular will handle the page changes on the front-end)
});
app.listen(4203, 'localhost');
console.log('MyProject Server is Listening on port 4203');

/*import 'es6-shim';
import { Request, Response } from 'express-serve-static-core';
import 'reflect-metadata';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';

const express = require('express');

// Allowed extensions list can be extended depending on your own needs
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

class Server {
  public app: any;
  private port = 4203;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    // Create expressjs application
    this.app = express();
    // Route our backend calls
    this.app.get('/api', (req, res) => res.json({ application: 'AppProject2' }));

    // Redirect all the other resquests
    this.app.get('*', (req: Request, res: Response) => {
      if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/${req.url}`));
      } else {
        res.sendFile(path.resolve('dist/index.html'));
      }
    });

    // Depending on your own needs, this can be extended
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.raw({ limit: '50mb' }));
    this.app.use(bodyParser.text({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }));

    // Start the server on the provided port
    this.app.listen(this.port, () => console.log(`http is started ${this.port}`));

    // Catch errors
    this.app.on('error', (error: any) => {
      console.error(moment().format(), 'ERROR', error);
    });

    process.on('uncaughtException', (error: any) => {
      console.log(moment().format(), error);
    });
  }
}

// Bootstrap the server, so it is actualy started
const server = Server.bootstrap();
export default server.app;*/
