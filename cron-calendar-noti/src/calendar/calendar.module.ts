import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CalendarEntity } from './entities/calendar.entity';
import { ContactEntity } from 'src/contact/entities/contact.entity';

@Module({
  imports: [SequelizeModule.forFeature([CalendarEntity, ContactEntity])],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendaerModule {}
