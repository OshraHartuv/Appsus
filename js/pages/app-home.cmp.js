export default {
    template: `
        <section class="home-page app-main">
            <div class="home-img">
                <img src="img/logo.png">
                <div class="home-header">
                    <h1 class="black-stroke">Welcome to Appsus</h1>
                    <h3 class="black-stroke">All you need is right here.</h3>
                </div>
            </div>
            <div class="home-content">
                <div class="home-mail flex">
                <router-link to="/mail">
                <span class="fa fa-envelope"></span>
                <p>Send mails to your acquaintances.
                    You can tell your mama you love her or tell your boss you want a raise.
                    You cant really send the massage but I'ts a good practice!
                </p>
                <router-link to="/mail">Check mail out </router-link>
            </router-link>
        </div>
        <div class="home-books flex">
            <router-link to="/book">
                
                <span class="fa fa-book"></span>
                    <p>Save book and review them right here! 
                    You can't actually read the book, but when did you really read a book for the lest time. If you want your date to think your smart:
                    </p>
                    <router-link to="/books">Check books out </router-link>
                    </router-link>
                </div>
                <div class="home-keep flex">
                <router-link to="/keep">
                <span class="fa fa-sticky-note"></span>
                    <p>Add and edit notes! 
                    You can save your favorite youtube videos, images or simply write yourself reminders and lists.
                    Don't miss out! We know your'e gonna forget that one thing...
                    </p>
                    <router-link to="/keep">Check keep out </router-link>
                    </router-link>
                </div>
            </div>
        </section>
    `
}