import express, { Application, Request, Response } from 'express';
const app: Application = express();

import cors from 'cors';

// default middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `Your expected route is not available ${req.url} with method ${req.method}`,
  });
});

export default app;
