import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './model/task.entity';

@Module({
  imports: [
    // todo: если что можно сделать config.service.ts
    // todo: и можно поменять названия базы данных как здесь, так и в докер компоузе
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Task],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
