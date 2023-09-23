import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { CalendaerModule } from './calendar/calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    ContactModule,
    CalendaerModule,
    MailModule,
  ],
  providers: [AppService],
})
export class AppModule {}
