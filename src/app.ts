import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import accountRoutes from './routes/accounts';
import contactRoutes from './routes/contacts';
import transactionRoutes from './routes/transactions';

const app = express();

app.use(json());

app.use('/api/accounts', accountRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/transactions', transactionRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
