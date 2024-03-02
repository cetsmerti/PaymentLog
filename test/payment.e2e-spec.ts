import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PaymantType } from '../src/modules/payment/types/category_type.enum';

describe('Payment (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/payment (POST) Generate payment ${PaymantType.INCOME}`, async () => {
    const mocPayment = {
      type: PaymantType.INCOME,
      amount: 0,
      description: 'string',
    };

    return request(app.getHttpServer())
      .post('/payment')
      .send(mocPayment)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.type).toEqual(PaymantType.INCOME);
        expect(res.body.amount).toEqual(0);
        expect(res.body.description).toEqual('string');
      });
  });

  it(`/payment (POST) Generate payment ${PaymantType.EXPENSE}`, async () => {
    return request(app.getHttpServer())
      .post('/payment')
      .send({
        type: PaymantType.INCOME,
        amount: 10,
        description: 'desc',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.type).toEqual(PaymantType.INCOME);
        expect(res.body.amount).toEqual(10);
        expect(res.body.description).toEqual('desc');
      });
  });

  it(`/payment (GET) Get all payments`, async () => {
    const res = await request(app.getHttpServer()).get('/payment');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it(`/payment (GET) Get all payments witch fillter (startDate) `, async () => {
    const res = await request(app.getHttpServer()).get('/payment').query({
      startDate: new Date(),
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(0);
  });

  it(`/payment (GET) Get all payments witch fillter (startDate,endDate)`, async () => {
    const res = await request(app.getHttpServer()).get('/payment').query({
      startDate: '2022-01-01',
      endDate: '2030-01-01',
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it(`/payment/select-category (POST) Select  category `, async () => {
    const mocPayment = {
      id: undefined,
      type: PaymantType.EXPENSE,
      amount: 10,
      description: 'desc',
    };
    const mocCateogry = {
      id: undefined,
      name: ((Math.random() * Math.pow(36, 6)) | 0).toString(36).toString(),
    };

    await request(app.getHttpServer())
      .post('/payment')
      .send(mocPayment)
      .expect(201)
      .then((el) => {
        mocPayment.id = el.body.id;
      });

    await request(app.getHttpServer())
      .post('/category')
      .send(mocCateogry)
      .expect(201)
      .then((el) => {
        mocCateogry.id = el.body.id;
      });
    return await request(app.getHttpServer())
      .post(`/payment/select-category/${mocPayment.id}`)
      .send({
        categoryIds: [mocCateogry.id],
      })
      .expect(201);
  });

  it(`/payment/{id} PATCH update payment`, async () => {
    const mocPayment = {
      id: undefined,
      type: PaymantType.EXPENSE,
      amount: 10,
      description: 'desc',
    };

    await request(app.getHttpServer())
      .post('/payment')
      .send(mocPayment)
      .expect(201)
      .then((res) => {
        mocPayment.id = res.body.id;
      });

    mocPayment.amount = 20;

    return await request(app.getHttpServer())
      .patch(`/payment/${mocPayment.id}`)
      .send(mocPayment)
      .expect(200)
      .expect((res) => {
        expect(res.body.amount).toEqual(20);
      });
  });

  it(`"payment/{id}" DELETE delete payment`, async () => {
    const mocPayment = {
      id: undefined,
      type: PaymantType.EXPENSE,
      amount: 10,
      description: 'desc',
    };

    await request(app.getHttpServer())
      .post('/payment')
      .send(mocPayment)
      .expect(201)
      .then((res) => {
        mocPayment.id = res.body.id;
      });

    return request(app.getHttpServer())
      .delete(`/payment/${mocPayment.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ message: 'Payment delete successfully' });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
