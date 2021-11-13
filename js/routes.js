import homePage from './pages/app-home.cmp.js';
import aboutPage from './pages/app-about.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';
import keepApp from './apps/keep/pages/note-app.cmp.js';
import mailDetails from './apps/mail/pages/mail-details.cmp.js';
import mailAdd from './apps/mail/cmps/mail-add.cmp.js'

// const aboutTeam = {
//     template: `<section class="about-team">
//         <h3>Our Team is Amazing</h3>
//         <p>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.
//         </p>
//     </section>   `
// }
// const aboutService = {
//     template: `<section class="about-service">
//         <h3>Services Are Us</h3>
//         <p>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.
//         </p>
//     </section>   `
// }

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
  },
  //
  // },
  //   {
  //       path: '/mail/:mailId',
  //       component: mailDetails
  //   },
  // {
  //     path: '/search',
  //     component: searchOnline
  // },
];

export const router = new VueRouter({ routes });
