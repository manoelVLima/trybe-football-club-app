import Teams from '../interfaces/Team';
import TeamModel from '../database/models/Team';

export default class TeamService {
  public model;

  constructor() {
    this.model = TeamModel;
  }

  public async getAll():Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getById(id:string):Promise<Teams | null> {
    const team = await this.model.findByPk(id);

    if (!team) return null;

    return team;
  }
}
