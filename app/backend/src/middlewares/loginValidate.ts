import { RequestHandler } from 'express';

const loginValidation: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  return next();
};

export default loginValidation;
