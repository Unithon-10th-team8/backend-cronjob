import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CalendarEntity } from './entities/calendar.entity';
import { Sequelize } from 'sequelize-typescript';
import * as dayjs from 'dayjs';
import { Op } from 'sequelize';
import { UserEntity } from 'src/contact/entities/user.entity';
import { ContactEntity } from 'src/contact/entities/contact.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(CalendarEntity)
    private calendarModel: typeof CalendarEntity,
    private sequelize: Sequelize,
  ) {
    sequelize.addModels([CalendarEntity]);
  }

  async getReminds(): Promise<CalendarEntity[]> {
    const calendarEvents = await this.getAllCalendarEvents();

    // remind_interval : 분 단위 정수 값
    // 알림을 보내야 할 시간 : start_dt - remind_interval (분)
    // 해야할 것 : 현재 시간이 start_dt - remind_interval (분)과 같은지 비교

    const now = dayjs();
    const notiEvents = [] as CalendarEntity[];

    for (const event of calendarEvents) {
      const startDt = dayjs(event.start_dt);
      const remindDt = startDt.subtract(event.remind_interval, 'minute');
      if (now.isSame(remindDt, 'minute')) {
        notiEvents.push(event);
      }
    }

    return notiEvents;
  }

  private async getAllCalendarEvents(): Promise<CalendarEntity[]> {
    const now = dayjs();

    const calendarEvents = await this.calendarModel.findAll({
      where: {
        start_dt: {
          [Op.gte]: now,
        },
        remind_interval: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: ContactEntity,
          attributes: ['name', 'user_id'],
          include: [
            {
              model: UserEntity,
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    console.log(JSON.stringify(calendarEvents));

    return calendarEvents;
  }
}
