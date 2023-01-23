import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Jwt from '../utils/Jwt';

const auth: RequestHandler = (req, res, next) => {
  const { authorization: token } = req.headers;
  const secret = process.env.JWT_SECRET as string;
  const jwt = new Jwt(secret);

  if (!token) return res.status(400).json({ message: 'Token not found' });

  const payload = jwt.validateToken(token) as JwtPayload;

  if (payload.isError) {
    return res.status(400).json({ message: payload.isError });
  }
  req.body.user = payload;
  return next();
};
export default auth;
