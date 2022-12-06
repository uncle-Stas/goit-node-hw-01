const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const filePath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(filePath);

  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await listContacts();
  const contact = data.find(item => item.id === contactId);
  if (!contact) {
    return null;
  }

  return contact;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const index = data.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = data.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return removedContact;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
