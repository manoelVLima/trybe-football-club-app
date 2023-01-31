import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesModel from '../database/models/Matches';
import { app } from '../app';
import { Response } from 'superagent';
import { resolve } from 'path';
import matches from './mocks/matches.mock';
chai.use(chaiHttp);

const { expect } = chai;
describe('Testa a rota de Matches', () => {

  // let chaiHttpResponse: Response;

  afterEach(function () { sinon.restore() });

  it('Testa se a rota /matches retorna todas as partidas', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any);

    const response: Response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(matches);
  })

  it('Testa se a rota /matches?inProgress=true retorna as partidas em progresso', async () => {
    const matchesInProgress = matches.filter((match) => match.inProgress === true)

    sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as any);

    const response: Response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(matchesInProgress);
  })

  it('Testa se a rota /matches?inProgress=false retorna as partidas finalizadas', async () => {
    const finishedMatches = matches.filter((match) => match.inProgress === false)

    sinon.stub(MatchesModel, 'findAll').resolves(finishedMatches as any);

    const response: Response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(finishedMatches);
  })

});