import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox9c7b0cc471a045a0826bc608d811ff62.mailgun.org"
});

const sendEmail = (to: string, subject: string, html: string) => {
  const emailData = {
    from: "kkumong9@gmail.com",
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello ${fullName} please verify your email`;
  const emailBody = `<a href="http://koo.com/${key}>Click Here</a>"`;
  return sendEmail("kkumong9@gmail.com", emailSubject, emailBody);
};

export default sendVerificationEmail;
