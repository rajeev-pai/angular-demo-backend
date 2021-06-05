import { sign, verify } from 'jsonwebtoken';

const SECRET = 'moneymanager';

export interface JwtPayload {
  id: number;
  email: string;
  username: string;
  iat?: number;
}

export const createJWT = (payload: JwtPayload) => {
  return sign(payload, SECRET);
};

export const verifyJWT = (token: string) => {
  return new Promise((resolve, reject) => {
    verify(token, SECRET, (err, decoded) => {
      if (decoded) {
        resolve(decoded);
      }

      reject('Invalid token!');
    });
  });
};
