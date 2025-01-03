import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { PentestModule } from './pentest/pentest.module';
import { FindingModule } from './finding/finding.module';
import { CommentModule } from './comment/comment.module';
import { ReportsModule } from './reports/reports.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    AttachmentsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [process.cwd(), 'dist/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE'),
      }),
    }),
    UsersModule,
    AuthModule,
    AssetsModule,
    PentestModule,
    FindingModule,
    CommentModule,
    ReportsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../uploads'),
      serveRoot: '/uploads', // todo: Serve files under /uploads
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
