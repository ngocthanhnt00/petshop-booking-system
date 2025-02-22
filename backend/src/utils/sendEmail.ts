import nodemailer from 'nodemailer';
import ENV_VARS from '../config';

const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ENV_VARS.EMAIL_USER,
        pass: ENV_VARS.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `Your App <${ENV_VARS.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send email');
  }
};

export default sendEmail;
