// import bookApp from './pages/book-app.cmp.js';
import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import mailApp from './apps/mail/pages/mail-index.cmp.js';
import keepApp from './apps/keep/pages/note-index.cmp.js';
// // import searchOnline from './pages/search-online.cmp.js';
// // import bookDetails from './pages/book-details.cmp.js';
// // import reviewAdd from './pages/review-add.cmp.js';

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
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
    },
    {
        path: '/mail',
        component: mailApp,
    },
    {
        path: '/keep',
        component: keepApp,
    },
    // children: [
    //         {
    //             path: '/team',
    //             component: aboutTeam
    //         },
    //         {
    //             path: '/service',
    //             component: aboutService
    //         },
    //     ]
    // },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/book/:bookId/review-add',
    //     component: reviewAdd
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
    // {
    //     path: '/search',
    //     component: searchOnline
    // },


];

export const router = new VueRouter({ routes });
