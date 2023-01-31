export default interface Match {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface MatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatches {
  id?: number;
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  type?: number,
  message?: string,
}
