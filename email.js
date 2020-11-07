const fs = require('fs');
const MailosaurClient = require('mailosaur');

const config = JSON.parse(fs.readFileSync('config.json'));

const mailosaur = new MailosaurClient(config.apikey);
const oneMinute = 60 * 1000;

const main = async () => {
  const emailAddress = `lars.${config.serverId}@mailosaur.io`;
  console.log(`Waiting for an email to arrive for ${emailAddress}`);
  const message = await mailosaur.messages.get(
    config.serverId,
    {
      sentTo: emailAddress,
    },
    {
      timeout: oneMinute,
    }
  );

  // console.log(JSON.stringify(message, null, 2));
  const { id, subject } = message;
  console.log(`Mail received with subject "${subject}"`);

  console.log('Deleting mail');
  await mailosaur.messages.del(id);
};

main().catch(console.error);
