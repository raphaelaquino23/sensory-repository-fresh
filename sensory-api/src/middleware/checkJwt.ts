import { Request, Response, NextFunction} from 'express';
import * as jwt from "jsonwebtoken"
import config from './config';

export const checkJwt = ( req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["x-access-token"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //res.redirect('/')
    if (res.status(401)) {
    }
    return;
  }

  const {userId, username} = jwtPayload;
  const newToken = jwt.sign({userId, username}, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  next();
};