import { createContent, getContentById, updateContent, deleteContent, getContentsByCategory, getAllContents } from '../../src/controllers/content.controller';
import Content from '../../src/models/content.model';

describe('Content Controller - Unit', () => {

  it('should create a new content', async () => {
    const req: any = { body: { title: 'Teste', description: 'Descrição', category: 'Direitos', link: 'http://link.com' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createContent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.objectContaining({ title: 'Teste' }),
      message: expect.any(String)
    }));
  });

  it('should get all contents', async () => {
    await Content.create({ title: 'A', description: 'D', category: 'Direitos', link: 'http://a.com' });
    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getAllContents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.arrayContaining([expect.objectContaining({ title: 'A' })]),
      message: expect.any(String)
    }));
  });

  it('should get content by id', async () => {
    const content = await Content.create({ title: 'Teste', description: 'Descrição', category: 'Direitos', link: 'http://link.com' });
    const req: any = { params: { id: content._id } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getContentById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.objectContaining({ title: 'Teste' }),
      message: expect.any(String)
    }));
  });

  it('should get contents by category', async () => {
    await Content.create({ title: 'B', description: 'D', category: 'Prevenção', link: 'http://b.com' });
    const req: any = { params: { category: 'Prevenção' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getContentsByCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.arrayContaining([expect.objectContaining({ category: 'Prevenção' })]),
      message: expect.any(String)
    }));
  });

  it('should update content', async () => {
    const content = await Content.create({ title: 'Old', description: 'Desc', category: 'Direitos', link: 'http://link.com' });
    const req: any = { params: { id: content._id }, body: { title: 'New' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateContent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.objectContaining({ title: 'New' }),
      message: expect.any(String)
    }));
  });

  it('should delete content', async () => {
    const content = await Content.create({ title: 'ToDelete', description: 'Desc', category: 'Direitos', link: 'http://link.com' });
    const req: any = { params: { id: content._id } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteContent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String)
    }));
  });

});
