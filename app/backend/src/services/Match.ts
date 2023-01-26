import Team from '../database/models/Team';
import MatchModel from '../database/models/Match';

export default class MatchService {
  public model;

  constructor() {
    this.model = MatchModel;
  }

  public async getAll() {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async getMatchesByQuery(trueOrFalse: boolean) {
    const matches = await this.model.findAll({
      where: { inProgress: trueOrFalse },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }
}
