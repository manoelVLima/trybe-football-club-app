import TeamModel from '../database/models/Teams';
import Statistics from '../utils/teams';

export default class LeaderboardServices {
  public model = TeamModel;

  public async leaderboard() {
    return this.model.findAll({
      include: [
        {
          association: 'homeMatchs',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } },
        {
          association: 'awayMatchs',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false } }],
    })
      .then((response) => response.map((team) => team.get({ plain: true })))
      .then((teams) => teams.map((team) => new Statistics(team)))
      .then((teams) => teams
        .sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn));
  }

  public async awayLeaderboard() {
    return this.model.findAll({
      include: [
        {
          association: 'awayMatchs',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: {
            inProgress: false,
          },
        },
      ],
    })
      .then((r) => r.map((team) => team.get({ plain: true })))
      .then((teams) => teams.map((team) => new Statistics(team)))
      .then((team) => team
        .sort((c, b) => b.totalPoints - c.totalPoints
        || b.goalsBalance - c.goalsBalance
        || b.goalsFavor - c.goalsFavor
        || b.goalsOwn - c.goalsOwn));
  }

  public async homeLeaderboard() {
    return this.model.findAll({
      include: [
        {
          association: 'homeMatchs',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: {
            inProgress: false,
          },
        },
      ],
    })
      .then((response) => response.map((team) => team.get({ plain: true })))
      .then((teams) => teams.map((team) => new Statistics(team)))
      .then((team) => team
        .sort((d, b) => b.totalPoints - d.totalPoints
        || b.goalsBalance - d.goalsBalance
        || b.goalsFavor - d.goalsFavor
        || b.goalsOwn - d.goalsOwn));
  }
}
