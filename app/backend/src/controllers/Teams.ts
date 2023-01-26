import { Request, Response } from 'express';
import TeamService from '../services/Teams';

export default class TeamController {
  public service;

  constructor() {
    this.service = new TeamService();
  }

  public async getAll(_req:Request, res:Response) {
    const teams = await this.service.getAll();
    return res.status(200).json(teams);
  }

  public async getById(req: Request, res:Response) {
    const { id } = req.params;
    const team = await this.service.getById(id);

    if (!team) {
      return res.status(400).json({ message: 'Team not found' });
    }

    return res.status(200).json(team);
  }
}
