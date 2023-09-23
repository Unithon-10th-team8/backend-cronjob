import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { CalendarService } from './calendar/calendar.service';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService,
    private readonly calendarService: CalendarService,
  ) {}

  async getHello(): Promise<any> {
    const contacts = await this.calendarService.getReminds();
    console.log(JSON.stringify(contacts));
  }

  async sendEmail(): Promise<void> {
    const reminds = await this.calendarService.getReminds();
    // const todayDate = dayjs().format('MM월 DD일');

    if (reminds.length === 0) {
      Logger.log('No calendar event to notify', 'AppService');
      return;
    }

    for (const remind of reminds) {
      try {
        // 바로 메일 형식 만들어서 보내기
        const to = remind.contact.user.email;
        console.log(to);

        // mailgun에 보낼 데이터 생성
        const mailContent = this.mailService.generateMailContent(remind);
        const content = {
          subject: `[KAMY] ${remind.name} 일정 안내`,
          ...mailContent,
        };

        // mailgun에 메일 전송
        await this.mailService.sendEmail(to, content);
      } catch (error) {
        Logger.error(error.message, '', 'AppService');
        throw new Error(error);
      }
    }

    // for (const user of notiUsers) {
    //   try {
    //     console.log(JSON.stringify(user[0]));

    //     const to = user[0].user.email;
    //     console.log(to);

    //     // mailgun에 보낼 데이터 생성
    //     const mailContent = this.mailService.generateMailContent(
    //       user,
    //       todayDate,
    //     );
    //     const content: IEmailContent = {
    //       subject: `[KAMY] ${todayDate} 일정 안내`,
    //       ...mailContent,
    //     };

    //     // mailgun에 메일 전송
    //     // await this.mailService.sendEmail(to, content);
    //   } catch (error) {
    //     Logger.error(error.message, '', 'AppService');
    //     throw new Error(error);
    //   }
    // }
  }
}
