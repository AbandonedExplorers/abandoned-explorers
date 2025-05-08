const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set in Netlify dashboard

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body || '{}');

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing email' }),
    };
  }

  const msg = {
    to: email,
    from: 'kevinh86@email.com', // Replace with your verified sender
    subject: 'You’re in! Welcome to the Explorer Club 🧭',
    text: 'Thanks for signing up! You’ll be among the first to get your hands on a box full of lost history.',
    html: `<p>Thanks for signing up for the <strong>Abandoned Places Explorer Box</strong>!</p>
           <p>You’ll be among the first to receive your mystery-packed box when we hit 100 signups.</p>`,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Confirmation sent' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email failed to send' }),
    };
  }
};
