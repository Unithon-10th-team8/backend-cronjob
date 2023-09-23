import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgun, { MailgunClientOptions, MessagesSendResult } from 'mailgun.js';
import * as formData from 'form-data';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import { IEmailContent } from './interfaces/IEmailContent.interface';
import { ContactEntity } from 'src/contact/entities/contact.entity';
import { baseMailTemplate } from './constants/template.contant';

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
    contact: ContactEntity[],
    date: string,
  ): Pick<IEmailContent, 'text' | 'html'> {
    const user_name = contact[0].user.name;
    const calendar_url = `${this.configService.get<string>(
      'FRONTEND_URL',
    )}/calendar}`;

    // generate calendar data
    const calendar_data_text = contact.map((c) => {
      return `${c.organization} ${c.name} ${c.position}에게 연락을 드려보세요!\n`;
    });
    const calendar_data_html = contact.map((c) => {
      return `<li>${c.organization} ${c.name} ${c.position}에게 연락을 드려보세요!</li>`;
    });

    const mailContent = {
      text: baseMailTemplate.text
        .replaceAll('{user_name}', user_name)
        .replaceAll('{date}', date)
        .replaceAll('{calendar_data_text}', calendar_data_text.join(''))
        .replaceAll('{calendar_data_url}', calendar_url),
      html: baseMailTemplate.html
        .replaceAll('{user_name}', user_name)
        .replaceAll('{date}', date)
        .replaceAll(
          '{calendar_data_html}',
          `<ul>${calendar_data_html.join('')}</ul>`,
        )
        .replaceAll('{calendar_data_url}', calendar_url),
    };

    return mailContent;
  }
}
