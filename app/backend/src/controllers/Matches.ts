import { Request, Response } from 'express';
import MatchService from '../services/Matches';

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

  public async setProgress(req:Request, res: Response) {
    const { id } = req.params;

    const { message, status } = await this.service.setProgress(id);
    return res.status(status).json({ message });
  }

  public async insertMatch(req:Request, res: Response) {
    const match = req.body;

    const { isError, data, message, status } = await this.service.insertMatch(match);

    if (isError) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }

  public async updateMatches(req:Request, res: Response) {
    const { id } = req.params;
    const matchGoals = req.body;

    const result = await this.service.updateMatches(id, matchGoals);
    return res.status(200).json(result);
  }
}
