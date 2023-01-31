import { IMatches } from '../interfaces/Matches';
import { TeamType } from '../interfaces/Teams';

export default class Statistics {
  public name: string;
  public totalPoints = 0;
  public totalVictories = 0;
  public totalDraws = 0;
  public totalLosses = 0;
  public totalGames = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  public goalsBalance = 0;
  public efficiency = 100.00;

  constructor(team: TeamType) {
    this.name = team.teamName;
    this.teamStatistics(team);
  }

  public winMatches() {
    this.totalVictories += 1;
    this.totalPoints += 3;
  }

  public drawMatches() {
    this.totalDraws += 1;
    this.totalPoints += 1;
  }

  public lostMatches() {
    this.totalLosses += 1;
  }

  public goalsBalances() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  public teamStatistics(team: TeamType) {
    if (team.homeMatchs) {
      this.totalGames += team.homeMatchs.length;
      this.goals(team.homeMatchs, true);

      team.homeMatchs.forEach((match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) this.winMatches();
        else if (match.homeTeamGoals < match.awayTeamGoals) this.lostMatches();
        else this.drawMatches();
      });
    }

    if (team.awayMatchs) {
      this.totalGames += team.awayMatchs.length;
      this.goals(team.awayMatchs, false);

      team.awayMatchs.forEach((match) => {
        if (match.awayTeamGoals > match.homeTeamGoals) this.winMatches();
        else if (match.awayTeamGoals < match.homeTeamGoals) this.lostMatches();
      });
    }
    this.efficiency = this.efficiencyInGames();
  }

  public goals(matches: IMatches[], local:boolean) {
    if (local) {
      matches.forEach((match) => {
        this.goalsFavor += match.homeTeamGoals;
        this.goalsOwn += match.awayTeamGoals;
        this.goalsBalances();
      });
    }

    if (!local) {
      matches.forEach((match) => {
        this.goalsFavor += match.awayTeamGoals;
        this.goalsOwn += match.homeTeamGoals;
        this.goalsBalances();
      });
    }
  }

  public efficiencyInGames() {
    if (!this.totalGames) return 100;
    return +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }
}
