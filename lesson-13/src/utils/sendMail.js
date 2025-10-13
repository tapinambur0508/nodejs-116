import nodemailer from 'nodemailer';

import { getEnvVariable } from './getEnvVariable.js';

const transport = nodemailer.createTransport({
  host: getEnvVariable('SMTP_HOST'),
  port: getEnvVariable('SMTP_PORT'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: getEnvVariable('SMTP_USER'),
    pass: getEnvVariable('SMTP_PASSWORD'),
  },
});

export async function sendMail(mail) {
  mail.from = 'vmudrij0508@gmail.com';

  await transport.sendMail(mail);
}
