import homePage from './pages/app-home.cmp.js';
import aboutPage from './pages/app-about.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';
import keepApp from './apps/keep/pages/note-app.cmp.js';
import mailDetails from './apps/mail/pages/mail-details.cmp.js';
import mailAdd from './apps/mail/cmps/mail-add.cmp.js'
import bookApp from './apps/books/pages/book-app.cmp.js';
import searchOnline from './apps/books/pages/search-online.cmp.js';
import bookDetails from './apps/books/pages/book-details.cmp.js';
import reviewAdd from './apps/books/pages/review-add.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/mail',
    component: mailApp,
    children: [
      {
        path: 'details/:mailId',
        component: mailDetails,
      },
      {
        path: 'compose/:note',
        component: mailAdd,
      },
    ],
  },
  {
    path: '/keep',
    component: keepApp,
    children: [
      {
        path: 'notefrommail/:mail',
        component: keepApp
      }
    ]
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/:bookId/review-add',
    component: reviewAdd
  },
  {
    path: '/book/:bookId',
    component: bookDetails
  },
  {
    path: '/search',
    component: searchOnline
  },
  // },
  //   {
  //       path: '/mail/:mailId',
  //       component: mailDetails
  //   },

];

export const router = new VueRouter({ routes });
