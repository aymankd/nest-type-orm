import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Not, In, LessThanOrEqual, Like, Between } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'typeorm-db',
      synchronize: true,
      entities: [User],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}
  onApplicationBootstrap() {
    this.query1();
    this.query2();
    this.query3();
    this.query4();
    this.query5();
    this.query6();
    this.query7();
  }

  async query1() {
    const users = await this.usersService.findAll({
      where: {
        firstName: 'Timber',
        lastName: 'Saw',
      },
    });
    console.log('query1: ', users);
  }

  async query2() {
    const users = await this.usersService.findAll({
      where: {
        firstName: Not('Timber'),
      },
    });
    console.log('query2: ', users);
  }

  async query3() {
    const users = await this.usersService.findAll({
      where: [{ firstName: 'Timber' }, { firstName: 'Mike' }],
    });
    console.log('query3: ', users);
  }

  async query4() {
    const users = await this.usersService.findAll({
      where: {
        firstName: In(['Timber', 'Mike']),
      },
    });
    console.log('query4: ', users);
  }

  async query5() {
    const users = await this.usersService.findAll({
      where: {
        age: LessThanOrEqual(10),
      },
    });
    console.log('query5: ', users);
  }

  async query6() {
    const users = await this.usersService.findAll({
      where: {
        firstName: Like('%er%'),
      },
    });
    console.log('query6: ', users);
  }

  async query7() {
    const users = await this.usersService.findAll({
      where: {
        age: Between(15, 25),
      },
    });
    console.log('query7: ', users);
  }
}
