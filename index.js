const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case 'getById':
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);

// invokeAction({ action: 'list' });
// invokeAction({ action: 'getById', id: '2' });
// invokeAction({
//   action: 'add',
//   name: 'dddddd',
//   email: 'ffffffffff',
//   phone: '+5365625565555',
// });
// invokeAction({ action: 'remove', id: '10' });
