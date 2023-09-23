import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { IEmailContent } from './mail/interfaces/IEmailContent.interface';
import { ContactService } from './contact/contact.service';
import * as dayjs from 'dayjs';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService,
    private readonly contactService: ContactService,
  ) {}

  async getHello(): Promise<any> {
    const contacts = await this.contactService.getRepeatNotis();
    console.log(JSON.stringify(contacts));
  }

  async sendEmail(): Promise<void> {
    const notiUsers = await this.contactService.getRepeatNotis();
    const todayDate = dayjs().format('MM월 DD일');

    if (notiUsers.length === 0) {
      Logger.log('No users to notify', 'AppService');
      return;
    }

    for (const user of notiUsers) {
      try {
        console.log(JSON.stringify(user[0]));

        const to = user[0].user.email;
        console.log(to);

        // mailgun에 보낼 데이터 생성
        const mailContent = this.mailService.generateMailContent(
          user,
          todayDate,
        );
        const content: IEmailContent = {
          subject: `[KAMY] ${todayDate} 일정 안내`,
          ...mailContent,
        };

        // mailgun에 메일 전송
        await this.mailService.sendEmail(to, content);
      } catch (error) {
        Logger.error(error.message, '', 'AppService');
        throw new Error(error);
      }
    }
  }
}
