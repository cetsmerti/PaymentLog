import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configDB = {
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [
      __dirname + '/../**/*.entity.js',
      'dist/**/*.entity.js',
      __dirname + '/../**/*.entity.ts',
    ],
    synchronize: true,
  }),
  inject: [ConfigService],
  imports: [ConfigModule.forRoot()],
};
