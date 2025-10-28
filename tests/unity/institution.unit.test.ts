import { createInstitution, getInstitutionById, updateInstitution, deleteInstitution, getInstitutionsByCity, getAllInstitutions } from '../../src/controllers/institution.controller';
import Institution from '../../src/models/institution.model';

describe('Institution Controller - Unit', () => {

  it('should create a new institution', async () => {
    const req: any = { body: { name: 'Casa', address: 'Rua 1', phone: '+55 21 1111-1111', city: 'RJ', website: 'http://casa.com' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createInstitution(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.objectContaining({ name: 'Casa' }),
      message: expect.any(String)
    }));
  });

  it('should get all institutions', async () => {
    await Institution.create({ name: 'A', address: 'Rua 1', phone: '1111', city: 'RJ' });
    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getAllInstitutions(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.arrayContaining([expect.objectContaining({ name: 'A' })]),
      message: expect.any(String)
    }));
  });

  it('should get institution by id', async () => {
    const inst = await Institution.create({ name: 'B', address: 'Rua 2', phone: '2222', city: 'SP' });
    const req: any = { params: { id: inst._id } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getInstitutionById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.objectContaining({ name: 'B' }),
      message: expect.any(String)
    }));
  });

  it('should get institutions by city', async () => {
    await Institution.create({ name: 'C', address: 'Rua 3', phone: '3333', city: 'RJ' });
    const req: any = { params: { city: 'RJ' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getInstitutionsByCity(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.arrayContaining([expect.objectContaining({ city: 'RJ' })]),
      message: expect.any(String)
    }));
  });

  it('should update institution', async () => {
    const inst = await Institution.create({ name: 'Old', address: 'Rua 4', phone: '4444', city: 'RJ' });
    const req: any = { params: { id: inst._id }, body: { name: 'New' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateInstitution(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.objectContaining({ name: 'New' }),
      message: expect.any(String)
    }));
  });

  it('should delete institution', async () => {
    const inst = await Institution.create({ name: 'ToDelete', address: 'Rua 5', phone: '5555', city: 'RJ' });
    const req: any = { params: { id: inst._id } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteInstitution(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
  });

});
