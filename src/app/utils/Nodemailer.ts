import nodemailer from 'nodemailer';

export const sendEmail = async (subject:any, text:any,image:any,email:string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user:"vikashmishra8371@gmail.com", 
      pass: 'sqkq gioz ueqb wain', 
    },
  });
  const mailOptions = {
    from:"vikashmishra8371@gmail.com",
    to:"vikasmishra1369@gmail.com",
    subject, 
    text,
    attachments: [
        {
          filename: 'complaint.jpeg',
          path: image,
          cid: 'unique@nodemailer.com', 
        },
      ], 
  };

  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return true
  } catch (error) {
    console.error('Error sending email: ', error);
    return false
  }
};
