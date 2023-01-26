import { Request, Response } from 'express';
import MatchService from '../services/Match';

export default class MatchController {
  public service;

  constructor() {
    this.service = new MatchService();
  }

  public async getMatches(req:Request, res: Response) {
    if (req.query.inProgress) {
      const matches = await this.service.getMatchesByQuery(req.query.inProgress === 'true');
      return res.status(200).json(matches);
    }
    const matches = await this.service.getAll();
    return res.status(200).json(matches);
  }

  public async insertMatch(req:Request, res: Response) {
    const match = req.body;

    const { error, data, message, status } = await this.service.insertMatch(match);

    if (error) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }
}
