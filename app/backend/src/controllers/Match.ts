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
}
