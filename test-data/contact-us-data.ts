export const validContactData = {
  name: 'Test User',
  email: 'test.user@example.com',
  phone: '+46 73 044 58 55',
  message: 'I would like to know more about Safora safety management solutions.',
};

export const invalidContactData = {
  shortName: {
    ...validContactData,
    name: 'A',
  },
  invalidEmail: {
    ...validContactData,
    email: 'testemail.com',
  },
  shortPhone: {
    ...validContactData,
    phone: '12345',
  },
  shortMessage: {
    ...validContactData,
    message: 'Hi',
  },
};
