import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';
_createMails();

export const mailService = {
    query,
    save: saveMail,
    getById: getByMailId,
    getNextMailId,
    getPreviousMailId,
    composeMail,
  };
  
  function query() {
    return storageService.query(MAILS_KEY);
  }

  function composeMail(mail){
    console.log(mail);
  }
  
  function getNextMailId(mailId) {
    return query()
        .then(mails => {
            const idx = mails.findIndex(mail => mail.id === mailId);
            return (idx === mails.length - 1) ? mails[0].id : mails[idx + 1].id;
        });
  }
  
  function getPreviousMailId(mailId) {
    return query()
        .then(mails => {
            const idx = mails.findIndex(mail => mail.id === mailId);
            return (idx === 0) ? mails[mails.length - 1].id : mails[idx - 1].id;
        });
  }

  
  function saveMail(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail);
    else return storageService.post(MAILS_KEY, mail);
  }
  
  function getByMailId(mailId) {
    return storageService.get(MAILS_KEY, mailId);
  }
  
  function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [
            {title:'lala'},
            {title:'lala'},
            {title:'lala'},
            {title:'lala'},
        ]
      utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
  }
  