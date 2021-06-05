import { RequestHandler } from 'express';

import { verifyJWT, JwtPayload } from '../util';

export const auth: RequestHandler = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  let authenticated = true;

  if (!authHeader) {
    authenticated = false;
    return res.status(401)
      .json({
        errors: {
          auth: 'Not authenticated!'
        }
      });
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = await verifyJWT(token) as JwtPayload;

    if (!decodedToken) {
      authenticated = false;
      return res.status(401)
        .json({
          errors: {
            auth: 'Not authenticated!'
          }
        });
    }

    req.params.accountId = decodedToken.id.toString();
  } catch (err) {
    return res.status(401)
      .json({
        errors: {
          auth: 'Not authenticated!'
        }
      });
  }

  next();
};