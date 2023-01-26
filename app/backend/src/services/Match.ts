import Match from '../interfaces/Match';
import Team from '../database/models/Team';
import MatchModel from '../database/models/Match';

export default class MatchService {
  public model;
  public teamModel;

  constructor() {
    this.model = MatchModel;
    this.teamModel = Team;
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

  public async insertMatch(match: Match) {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = match;

    if (awayTeamId === homeTeamId) {
      return { error: true,
        message: 'It is not possible to create a match with two equal teams',
        status: 422,
      };
    }
    const homeTeam = await this.teamModel.findByPk(homeTeamId);
    const awayTeam = await this.teamModel.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { error: true, message: 'There is no team with such id!', status: 404 };
    }
    const newMatch = await this.model.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });

    return { error: false, data: newMatch, status: 401 };
  }
}
