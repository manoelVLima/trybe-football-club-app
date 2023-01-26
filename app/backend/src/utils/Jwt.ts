import * as jwt from 'jsonwebtoken';
import User from '../interfaces/User';

export default class Jwt {
  public secret;

  constructor(secret: string) {
    this.secret = secret;
  }

  public createToken(user: User) {
    try {
      const token = jwt.sign(user, this.secret, { algorithm: 'HS256', expiresIn: '3d' });
      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public validateToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (error) {
      console.log(error);
      return { isError: true, message: 'Token must be a valid token' };
    }
  }
}
