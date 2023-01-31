import Match from './Matches';
import MatchModel from '../database/models/Matches';

export default interface Teams {
  id: number;
  teamName: string;
}

export interface TeamWithMatches {
  id: number;
  teamName: string;
  homeMatches: Match[];
}

export interface TeamType {
  id: number;
  teamName: string;
  homeMatchs?: [MatchModel];
  awayMatchs?: [MatchModel];
}
