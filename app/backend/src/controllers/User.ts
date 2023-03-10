import { Request, Response } from 'express';
import UserService from '../services/User';

export default class UserController {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public async login(req:Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.service.login(email, password);
    if (!token) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json({ token });
  }

  public async findRole(req:Request, res: Response) {
    const response = await this.service.findRole(req.body.user);
    return res.status(200).json(response);
  }
}
