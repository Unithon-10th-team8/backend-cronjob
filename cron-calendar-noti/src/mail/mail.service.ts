import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgun, { MailgunClientOptions, MessagesSendResult } from 'mailgun.js';
import * as formData from 'form-data';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import { IEmailContent } from './interfaces/IEmailContent.interface';
import { baseMailTemplate } from './constants/template.contant';
import { CalendarEntity } from 'src/calendar/entities/calendar.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private senderDomain = 'haenu.dev';
  private senderEmailAddress = 'kamy-noreply@haenu.dev';

  private async getMailgunClient(): Promise<IMailgunClient> {
    const mailgun = new Mailgun(formData);

    const mailgunClientOptions: MailgunClientOptions = {
      username: this.configService.get<string>('MAILGUN_USERNAME'),
      key: this.configService.get<string>('MAILGUN_API_KEY'),
    };
    const mg = mailgun.client(mailgunClientOptions);

    return mg;
  }

  async sendEmail(
    to: string,
    content: IEmailContent,
  ): Promise<MessagesSendResult> {
    Logger.log(`sending Email to ${to}`, 'MailService');
    const mg = await this.getMailgunClient();

    await mg.messages
      .create(this.senderDomain, {
        from: this.senderEmailAddress,
        to,
        subject: content.subject,
        text: content.text,
        html: content.html,
      })
      .then(() => {
        // console.log(msg)
        Logger.log('Email Sent!', 'MailService');
      }) // logs response data
      .catch((err) => {
        Logger.error(err, '', 'MailService');
        throw new Error(err);
      }); // logs any error

    return;
  }

  generateMailContent(
    calendar: CalendarEntity,
  ): Pick<IEmailContent, 'text' | 'html'> {
    const user_name = calendar.contact.user.name;
    const event_name = calendar.name;
    const contact_name = calendar.contact.name;
    const calendar_url = `${this.configService.get<string>(
      'FRONTEND_URL',
    )}/calendar`;

    const date_beautify = dayjs(calendar.start_dt).format(
      'YYYY년 MM월 DD일 HH시 mm분',
    );

    // generate calendar data
    const calendar_data_text = `${calendar.name} 일정이 ${date_beautify}에 시작됩니다.\n\n일정 설명 : ${calendar.content}`;
    const calendar_data_html = `<p>${calendar.name} 일정이 ${date_beautify}에 시작됩니다.</p><p>일정 설명 : ${calendar.content}</p>`;

    const mailContent = {
      text: baseMailTemplate.text
        .replaceAll('{user_name}', user_name)
        .replaceAll('{contact_name}', contact_name)
        .replaceAll('{event_name}', event_name)
        .replaceAll('{calendar_data_text}', calendar_data_text)
        .replaceAll('{calendar_data_url}', calendar_url),
      html: baseMailTemplate.html
        .replaceAll('{user_name}', user_name)
        .replaceAll('{contact_name}', contact_name)
        .replaceAll('{event_name}', event_name)
        .replaceAll('{calendar_data_html}', `${calendar_data_html}`)
        .replaceAll('{calendar_data_url}', calendar_url),
    };

    return mailContent;
  }
}
