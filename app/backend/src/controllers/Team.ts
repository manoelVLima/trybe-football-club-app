import { Request, Response } from 'express';
import TeamService from '../services/Team';

export default class TeamController {
  public service;

  constructor() {
    this.service = new TeamService();
  }

  public async getAll(_req:Request, res:Response) {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'NOT FOUND' });
    }
  }

  public async getById(req: Request, res:Response) {
    try {
      const { id } = req.params;
      const team = await this.service.getById(id);

      if (!team) {
        return res.status(400).json({ message: 'Team not found' });
      }

      return res.status(200).json(team);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: 'NOT FOUND' });
    }
  }
}
