import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Oshra & Adam',
};
_createMails();

export const mailService = {
  query,
  saveMail,
  getMailById,
  getNextMailId,
  getPreviousMailId,
  nameToShow,
  getUser,
  removeMail,
  moveToTrash,
  editAndSave,
};

function query() {
  return storageService.query(MAILS_KEY);
}

function getUser() {
  return loggedinUser;
}

function editAndSave(mail, key, val) {
  mail[key] = val;
  return saveMail(mail);
}

function moveToTrash(mailId) {
  mail = getMailById(mailId);
  mail.removedAt = Date.now();
  return storageService.put(MAILS_KEY, mail);
}

function removeMail(mailId) {
  return storageService.remove(MAILS_KEY, mailId);
}

function nameToShow(mail) {
  const contactMail = mail.to ? mail.to : mail.from;
  const contactName = contactMail.substring(0, contactMail.indexOf('@'));
  return contactName;
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
        sentAt: 1630179089000,
        to: 'momo@momo.com',
      },
      {
        id: 'e102',
        subject: 'Rental lease',
        body: "I'm raising the rent by 300NIS. Please call me about renewing our list, dont forget! The list ends at the end ",
        isRead: false,
        receivedAt: 1630249489000,
        from: 'baalDira@Hara.com',
      },
      {
        id: 'e103',
        subject: 'I have cookies for you',
        body: 'I baked some cookies for you. Come visit when your done with the project.',
        isRead: true,
        receivedAt: 1630399089000,
        from: 'yourMama@isAwsome.com',
      },
      {
        id: 'e104',
        subject: 'Coding Academy is good for business',
        body: 'Here is your monthly bill from wolt.',
        isRead: false,
        receivedAt: 1630471089000,
        from: 'wolt@wolt.com',
      },
      {
        id: 'e105',
        subject: 'Get ready for us!',
        body: 'Ready to find us some jobs?',
        isRead: true,
        sentAt: 1630522289000,
        to: 'linkedIn@linkedIn.com',
      },
      {
        id: 'e106',
        subject: 'Project is done!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1630623315177,
        to: 'linkedIn@linkedIn.com',
        isStared: true,
      },
      {
        id: 'e107',
        subject: 'How you doing?',
        body: 'Aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptatLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        receivedAt: 1630723311177,
        from: 'linkedIn@linkedIn.com',
      },
      {
        id: 'e108',
        subject: 'BOOOOOOOOOOOOO',
        body: 'Eenetur inventore, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia  deserunt molestias',
        isRead: false,
        receivedAt: 1630822315177,
        from: 'yoyoyoy@mailiz.com',
      },
      {
        id: 'e109',
        subject: 'Answerrrrrrrr',
        body: 'Inventore, saepe mollitia impedit quia Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: false,
        receivedAt: 1630923213177,
        from: 'yoyoyoy@mailiz.com',
      },
      {
        id: 'e110',
        subject: 'Promotion',
        body: ' Eum ex Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: false,
        receivedAt: 1631023115077,
        from: 'lala@mailiz.com',
        removedAt: 1631123315177,
      },
      {
        id: 'e111',
        subject: 'Facebook',
        body: 'Saepe mollitia Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        receivedAt: 1631223315177,
        from: 'fb@mailiz.com',
        isStared: true,
      },
      {
        id: 'e112',
        subject: 'GO!',
        body: 'Eius ipsum aspernatur molestiae Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        receivedAt: 1631314315177,
        from: 'tiny@mailiz.com',
      },
      {
        id: 'e113',
        subject: 'Byeeeee',
        body: 'Molestiae nihil ea suscipit accusantium eligendi Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        receivedAt: 1631402315177,
        from: 'buyy@mailiz.com',
        removedAt: 1636823315177,
      },
      {
        id: 'e114',
        subject: 'Yapa do!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1631523315177,
        to: 'lala@papa.com',
      },
      {
        id: 'e115',
        subject: 'Do!!!',
        body: 'Gnjk Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1631600315177,
        to: 'luki@papa.com',
      },
      {
        id: 'e116',
        subject: 'Loveeeee!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1631723315177,
        to: 'titnto@.com',
      },
      {
        id: 'e117',
        subject: 'Lsd!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1631800315177,
        to: 'shubi@papa.com',
        removedAt: 1636823315177,
      },
      {
        id: 'e118',
        subject: 'What are you eating?',
        body: 'Eius ipsum aspernatur molestiae Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        receivedAt: 1631914000177,
        from: 'tinto@mailiz.com',
        isStared: true,
      },
      {
        id: 'e119',
        subject: 'KOOOOO!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1632020000007,
        to: 'ba@li.com',
        isDraft: true,
      },
      {
        id: 'e121',
        subject: 'Ksfsdfsd!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1632220000007,
        to: 'ba@li.com',
        isDraft: true,
      },
      {
        id: 'e122',
        subject: 'dsfgsdf!',
        body: 'Saepe mollitia impedit quia teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        sentAt: 1632320000007,
        to: 'ba@li.com',
      },
      {
        id: 'e123',
        subject: 'sadihasduap!',
        body: 'Eius ipsum aspernatur molestiae Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ex magni eius ipsum aspernatur molestiae nihil ea suscipit accusantium eligendi qui, voluptate, inventore, saepe mollitia impedit quia tenetur deserunt molestias',
        isRead: true,
        receivedAt: 1632400000177,
        from: 'tucky@mailiz.com',
        isStared: true,
      },
    ];
    utilService.saveToStorage(MAILS_KEY, mails);
  }
  return mails;
}

