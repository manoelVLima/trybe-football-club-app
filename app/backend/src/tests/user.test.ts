import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/User';
import user from './mocks/user.mock';
import { app } from '../app';
import Jwt from '../utils/Jwt'
import { Response } from 'superagent';
import token from './mocks/token.mock';
import { resolve } from 'path';

chai.use(chaiHttp);

const secret = process.env.JWT_SECRET || 'bolacha' as string;
const jsonwebtoken = new Jwt(secret)

const { expect } = chai;
describe('Testa a rota de Login', () => {

  // let chaiHttpResponse: Response;

  afterEach(function () { sinon.restore() });

  it('Testa a requisição POST para realizar login com sucesso', async () => {

    sinon.stub(UserModel, 'findOne').resolves(user as any)

    const response: Response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token')
  });

  it('Testa a requisição POST para realizar login sem o campo email preenchido', async () => {

    sinon.stub(UserModel, 'findOne').resolves(user as any)

    const response: Response = await chai.request(app).post('/login').send({
      password: 'secret_admin'
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa a requisição POST para realizar login sem o campo password preenchido', async () => {

    sinon.stub(UserModel, 'findOne').resolves(user as any)

    const response: Response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa a requisição POST para realizar login com os campos inválidos', async () => {

    sinon.stub(UserModel, 'findOne').resolves(user as any)

    const response: Response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin1'
    });

    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  // it('Testa a requisição GET para realizar a busca da role do usuário com sucesso', async () => {

  //   sinon.stub(UserModel, 'findOne').resolves({ role: user.role } as any)

  //   const response: Response = await chai.request(app).get('/login/validate').set('authorization', token)

  //   expect(response.status).to.equal(400);
  //   expect(response.body).to.be.deep.equal({ role: 'admin' });
  // });

  it('Testa a requisição GET para realizar a busca da role do usuário sem envio do token', async () => {

    sinon.stub(UserModel, 'findOne').resolves(user as any)

    const response: Response = await chai.request(app).get('/login/validate')

    expect(response.status).to.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });
});