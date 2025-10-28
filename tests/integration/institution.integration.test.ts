import request from 'supertest';
import app from '../../src/app';
import Institution from '../../src/models/institution.model';

describe('Institution Routes - Integration', () => {

  it('POST /institutions', async () => {
    const res = await request(app).post('/institutions').send({
      name: 'Casa', address: 'Rua 1', phone: '+55 21 1111-1111', city: 'RJ', website: 'http://casa.com'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('content._id');
    expect(res.body.content.name).toBe('Casa');
    expect(res.body).toHaveProperty('message');
  });

  it('GET /institutions', async () => {
    await Institution.create({ name: 'A', address: 'Rua 1', phone: '1111', city: 'RJ' });
    const res = await request(app).get('/institutions');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('content');
    expect(res.body.content.length).toBeGreaterThan(0);
  });

  it('GET /institutions/:id', async () => {
    const inst = await Institution.create({ name: 'B', address: 'Rua 2', phone: '2222', city: 'SP' });
    const res = await request(app).get(`/institutions/${inst._id}`);

    expect(res.status).toBe(200);
    expect(res.body.content.name).toBe('B');
  });

});
