import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';
_createMails();
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' };

export const mailService = {
  query,
  saveMail,
  getMailById,
  getNextMailId,
  getPreviousMailId,
  composeMail,
};

function query() {
  return storageService.query(MAILS_KEY);
}

function composeMail(mail) {
  console.log(mail);
}

function getNextMailId(mailId) {
  return query().then((mails) => {
    const idx = mails.findIndex((mail) => mail.id === mailId);
    return idx === mails.length - 1 ? mails[0].id : mails[idx + 1].id;
  });
}

function getPreviousMailId(mailId) {
  return query().then((mails) => {
    const idx = mails.findIndex((mail) => mail.id === mailId);
    return idx === 0 ? mails[mails.length - 1].id : mails[idx - 1].id;
  });
}

function saveMail(mail) {
  if (mail.id) return storageService.put(MAILS_KEY, mail);
  else return storageService.post(MAILS_KEY, mail);
}

function getMailById(mailId) {
  return storageService.get(MAILS_KEY, mailId);
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY);
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
    ];
    utilService.saveToStorage(MAILS_KEY, mails);
  }
  return mails;
}
