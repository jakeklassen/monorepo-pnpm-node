import express from 'express';
import axios, { AxiosAdapter, AxiosError } from 'axios';
import { dtos } from '@sizzle/common';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) =>
  res.json({
    message: '🚀',
  }),
);

app.post('/users', async (req, res, next) => {
  try {
    const createUserResponse = await axios.post<dtos.CreateApiUser>(
      'http://localhost:3030/users',
      {
        email: 'jklassendev@gmail.com',
      },
    );

    res.json(createUserResponse.data);
  } catch (error) {
    console.log(error);

    if (error.isAxiosError === true) {
      next((error as AxiosError).response?.data);
      return;
    }

    next(error);
  }
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    res.status(500).json({ error: err });
  },
);

app.listen(PORT, () => console.log(`Live at http://localhost:${PORT}`));
