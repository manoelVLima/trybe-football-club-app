import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/Team';
import { app } from '../app';
import { Response } from 'superagent';
import { resolve } from 'path';
import teams from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testa a rota de Teams', () => {

  // let chaiHttpResponse: Response;

  afterEach(function () { sinon.restore() });

  it('Testa se a rota /teams retorna todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as any);

    const response: Response = await chai.request(app).get('/teams');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(teams);

  });

  it('Testa se a rota /teams/:id retorna um time por id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as any);

    const response: Response = await chai.request(app).get('/teams/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(teams[0]);

  });

  it('Testa se a rota /teams/:id retorna um erro para um id inválido', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(null);

    const response: Response = await chai.request(app).get('/teams/155');

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Team not found' });

  });
})