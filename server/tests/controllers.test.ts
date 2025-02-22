
import express from 'express'
import router from '../router'
import supertest from 'supertest'
import Item from '../models/item'
import mock from '../mocks/mocks'
import mongoose from 'mongoose'
const databaseName = 'test'


describe('integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {

    const url = `mongodb://127.0.0.1/${databaseName}`;
    try {
      await mongoose.connect(url)
    } catch (error) {
      await mongoose.connection.close()
      await mongoose.connect(url)
    }
  });

  afterEach(async () => {
    await Item.deleteMany()
  });

  it('should save an item to the database', async () => {
    const res = await request.post('/items').send({ ...mock })
    const items = await Item.find({})
    const item = items[0]
    expect(item.title).toBe('title')
  })
  
  it('should fetch items from the database correctly', async () => {
    await request.post('/items').send({ ...mock })
    await request.post('/items').send({ ...mock })
    await request.post('/items').send({ ...mock })
    const items = await request.get('/items')
    expect(items.body).toHaveLength(3)
  })

})

export default {}