import * as bcrypt from 'bcryptjs';
import User from '../interfaces/User';
import UserModel from '../database/models/User';
import Jwt from '../utils/Jwt';

const secret = process.env.JWT_SECRET as string;

export default class UserService {
  public model;
  public jwt;

  constructor() {
    this.model = UserModel;
    this.jwt = new Jwt(secret);
  }

  public async login(email:string, password:string):Promise<string | null | unknown> {
    const user = await this.model.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return this.jwt.createToken({ email });
    }
    return null;
  }

  public async validate(user:User) {
    const response = await this.model.findOne({ where: { email: user.email } }) as User;
    return ({ role: response.role });
  }
}
