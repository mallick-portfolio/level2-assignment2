import express, { Application, Request, Response } from 'express';
const app: Application = express();

import cors from 'cors';
import { UserRoute } from './app/modules/user/user.route';

// default middleware
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1/users', UserRoute);

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
