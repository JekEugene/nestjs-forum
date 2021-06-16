import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user/user.model";
import { Post } from "./post/post.model";
import { Comment } from "./post/comment.model";
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [  SequelizeModule.forRoot({
              dialect: 'postgres',
              host: 'localhost',
              port: 5432,
              define: {
                timestamps: false,
              },
              username: 'postgres',
              password: 'root',
              database: 'forum1',
              models: [User, Post, Comment],
              autoLoadModels: true,
              synchronize: true
            }),
            UserModule,
            HomeModule,
            PostModule,
            AuthModule
          ],
  providers: [AuthService]
})
export class AppModule {}