// import { Op } from 'sequelize';
import { Op } from 'sequelize';
import Match, { MatchGoals } from '../interfaces/Matches';
import Team from '../database/models/Teams';
import MatchModel from '../database/models/Matches';

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

  public async setProgress(id: string) {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return { message: 'Finished', status: 200 };
  }

  public async insertMatch(match: Match) {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = match;

    if (homeTeamId === awayTeamId) {
      return { isError: true,
        message: 'It is not possible to create a match with two equal teams',
        status: 422 };
    }

    const team = await this.teamModel.findAll({
      where: { id: { [Op.in]: [awayTeamId, homeTeamId] } } });

    if (!team[0] || !team[1]) {
      return { isError: true,
        message: 'There is no team with such id!',
        status: 404 };
    }

    const newMatch = await this.model
      .create({ awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress: true });
    return { data: newMatch, isError: false, status: 201 };
  }

  public async updateMatches(id:string, matchGoals:MatchGoals) {
    const { awayTeamGoals, homeTeamGoals } = matchGoals;

    await this.model.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
    return { message: 'Match updated' };
  }
}
