import { dtos, axios as sizzleAxios } from '@sizzle/common';
import axios from 'axios';
import express from 'express';

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
    if (sizzleAxios.isAxiosError(error)) {
      next(error.response?.data);

      return;
    }

    next(error);
  }
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
  ) => {
    res.status(500).json({ error: err });
  },
);

app.listen(PORT, () => console.log(`Live at http://localhost:${PORT}`));
