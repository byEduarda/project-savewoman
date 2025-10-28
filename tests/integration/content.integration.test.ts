import request from 'supertest';
import app from '../../src/app';
import Content from '../../src/models/content.model';

describe('Content Routes - Integration', () => {

  it('POST /contents', async () => {
    const res = await request(app).post('/contents').send({
      title: 'Direitos', description: 'Conteúdo sobre direitos', category: 'Direitos', link: 'http://link.com'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('content._id');
    expect(res.body.content.title).toBe('Direitos');
    expect(res.body).toHaveProperty('message');
  });

  it('GET /contents', async () => {
    await Content.create({ title: 'A', description: 'D', category: 'Direitos', link: 'http://a.com' });
    const res = await request(app).get('/contents');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('content');
    expect(res.body.content.length).toBeGreaterThan(0);
  });

  it('GET /contents/:id', async () => {
    const content = await Content.create({ title: 'B', description: 'D', category: 'Prevenção', link: 'http://b.com' });
    const res = await request(app).get(`/contents/${content._id}`);

    expect(res.status).toBe(200);
    expect(res.body.content.title).toBe('B');
  });

});
