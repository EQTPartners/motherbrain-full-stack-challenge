import express from 'express';

export class Router {
  public router = express.Router();

  public initialize() {
    this.router.get('/', (req, res) => {
      res.send('Hello World');
    });
  }
}
