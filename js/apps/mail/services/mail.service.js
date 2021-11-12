import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';
const loggedinUser = { 
  email: 'user@appsus.com',
  fullname: 'Oshra & Adam'
};
_createMails();

export const mailService = {
  query,
  saveMail,
  getMailById,
  getNextMailId,
  getPreviousMailId,
  composeMail,
  nameToShow,
  getUser,
  removeMail
};

function query() {
  return storageService.query(MAILS_KEY);
}

function getUser(){
  return loggedinUser;
}
// id: 'e101',
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometimes',
//         isRead: false,
//         sentAt: 1631279089000,
//         to: 'momo@momo.com',

// to: '',
// subject: '',
// body: '',

function removeMail(mailId) {
  // return Promise.reject('Big balagan!')
  return storageService.remove(MAILS_KEY, mailId);
}

function nameToShow(mail) {
  const contactMail = mail.to ? mail.to : mail.from;
  const contactName = contactMail.substring(0, contactMail.indexOf('@'));
  return contactName;
}

function composeMail(mail) {
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
        isRead: true,
        sentAt: 1631279089000,
        to: 'momo@momo.com',
      },
      {
        id: 'e102',
        subject: 'Rental lease',
        body: 'I\'m raising the rent by 300NIS. Please call me about renewing our list, dont forget! The list ends at the end ',
        isRead: false,
        receivedAt: 1636549489000,
        from: 'baalDira@Hara.com',
      },
      {
        id: 'e103',
        subject: 'I have cookies for you',
        body: 'I baked some cookies for you. Come visit when your done with the project.',
        isRead: true,
        receivedAt: 1635599089000,
        from: 'yourMama@isAwsome.com',
      },
      {
        id: 'e104',
        subject: 'Coding Academy is good for business',
        body: 'Here is your monthly bill from wolt.',
        isRead: false,
        receivedAt: 1633871089000,
        from: 'wolt@wolt.com',
      },
      {
        id: 'e105',
        subject: 'Get ready for us!',
        body: 'Ready to find us some jobs?',
        isRead: true,
        sentAt: 1636722289000,
        to: 'linkedIn@linkedIn.com',
      },
    ];
    utilService.saveToStorage(MAILS_KEY, mails);
  }
  return mails;
}
