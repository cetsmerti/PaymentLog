import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/category (POST)', async () => {
    const category = {
      name: ((Math.random() * Math.pow(36, 6)) | 0).toString(36).toString(),
    };

    return request(app.getHttpServer())
      .post('/category')
      .send(category)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.name).toEqual(category.name);
      });
  });

  it('/category (GET)', async () => {
    return request(app.getHttpServer())
      .get('/category')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/category/:id (GET)', async () => {
    const category = {
      id: undefined,
      name: ((Math.random() * Math.pow(36, 6)) | 0).toString(36).toString(),
    };

    await request(app.getHttpServer())
      .post('/category')
      .send(category)
      .expect(201)
      .then((res) => {
        category.id = res.body.id;
      });

    return request(app.getHttpServer())
      .get(`/category/${category.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.name).toEqual(category.name);
      });
  });

  it('/category/:id (DELETE)', async () => {
    const category = {
      id: undefined,
      name: ((Math.random() * Math.pow(36, 6)) | 0).toString(36).toString(),
    };

    await request(app.getHttpServer())
      .post('/category')
      .send(category)
      .expect(201)
      .then((res) => {
        category.id = res.body.id;
      });

    return request(app.getHttpServer())
      .delete(`/category/${category.id}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
