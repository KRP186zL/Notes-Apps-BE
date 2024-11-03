require('dotenv').config();

const amqplib = require('amqplib');

const NotesService = require('./NotesService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

(async ()=>{
  const notesService = new NotesService();
  const mailSender = new MailSender();
  const listener = new Listener(notesService, mailSender);


  const connection = await amqplib.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:notes', {
    durable:true
  });

  await channel.consume('export:notes', listener.listen,  { noAck:true });

})();