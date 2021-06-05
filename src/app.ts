import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import accountRoutes from './routes/accounts';
import contactRoutes from './routes/contacts';
import transactionRoutes from './routes/transactions';

const app = express();

app.use(json());

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization'
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   // res.setHeader('Access-Control-Allow-Credentials', 'true');

//   // Pass to next layer of middleware
//   next();
// });

app.use('/api/accounts', accountRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/transactions', transactionRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
