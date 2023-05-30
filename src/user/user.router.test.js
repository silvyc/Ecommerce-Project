import supertest from 'supertest';
import app, { closeServer, startListening } from '../app';
import { connectDatabase, disconnectDatabase } from '../database';
import userModel from './user.model';

describe('User Endpoints /user', () => {
  beforeAll(async () => {
    await connectDatabase();
    startListening();
    await userModel.collection.drop();
  });

  afterAll(() => {
    disconnectDatabase();
    closeServer();
  });

  let _id;
  let token;

  // POST /user
  describe('POST /', () => {
    test('status 200, campos correctos', async () => {
      const response = await supertest(app).post('/user').send({
        name: 'Pedro',
        email: '1@1',
        password: '123',
        phone: '1',
        address: 'casa',
      });
      expect(response.status).toBe(201);
      _id = response.body._id;
    });

    test('status 400, campos incorrectos', async () => {
      const response = await supertest(app).post('/user').send({
        name: 'Pedro',
        password: '123',
        phone: '1',
        address: 'casa',
      });
      expect(response.status).toBe(400);
    });

    test('status 400, correo existente', async () => {
      const response = await supertest(app).post('/user').send({
        name: 'Andres',
        password: '123',
        email: '1@1',
        phone: '1',
        address: 'casa',
      });
      expect(response.status).toBe(400);
    });
  });

  //POST /user/login
  describe('POST /login', () => {
    test('status 200, credenciales correctas', async () => {
      const response = await supertest(app).post('/user/login').send({
        email: '1@1',
        password: '123',
      });
      expect(response.status).toBe(200);
      token = response.body.token;
    });
    test('status 404, credenciales incorrectas', async () => {
      const response = await supertest(app).post('/user/login').send({
        email: '1@1',
        password: '123456',
      });
      expect(response.status).toBe(404);
    });
  });

  //POST /user/login
  describe('GET /:_id', () => {
    test('status 200, id valido', async () => {
      const response = await supertest(app).get('/user/' + _id);
      expect(response.status).toBe(200);
    });
    test('status 400, id invalido', async () => {
      const response = await supertest(app).get('/user/loquesea').send();
      expect(response.status).toBe(400);
    });
    test('status 404, id inexistente', async () => {
      const response = await supertest(app).get(
        '/user/64757063f4f3bfebb70a8827'
      );
      expect(response.status).toBe(404);
    });
  });

  //PATCH /user
  describe('PATCH /', () => {
    test('status 200, token valido', async () => {
      const response = await supertest(app)
        .patch('/user')
        .set('Authorization', 'Bearer ' + token);

      expect(response.status).toBe(200);
    });
    test('status 400, token invalido', async () => {
      const response = await supertest(app)
        .patch('/user')
        .set('Authorization', 'Bearer secreto');
      expect(response.status).toBe(400);
    });
  });

  //DELETE /user
  describe('DELETE /', () => {
    test('status 200, token valido', async () => {
      const response = await supertest(app)
        .delete('/user')
        .set('Authorization', 'Bearer ' + token);

      expect(response.status).toBe(200);
    });
    test('status 400, token invalido', async () => {
      const response = await supertest(app)
        .delete('/user')
        .set('Authorization', 'Bearer secreto');
      expect(response.status).toBe(400);
    });
  });
});
