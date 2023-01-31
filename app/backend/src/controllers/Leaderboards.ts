import { Request, Response } from 'express';
import LeaderboardServices from '../services/Leaderboards';

export default class LeaderboardController {
  public service = new LeaderboardServices();

  public async homeLeaderboard(_req: Request, res: Response) {
    const result = await this.service.homeLeaderboard();

    return res.status(200).json(result);
  }

  public async awayLeaderboard(_req: Request, res: Response) {
    const result = await this.service.awayLeaderboard();

    return res.status(200).json(result);
  }

  public async leaderboard(_req: Request, res: Response) {
    const result = await this.service.leaderboard();

    return res.status(200).json(result);
  }
}
