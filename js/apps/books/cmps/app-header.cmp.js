export default {
    template: `
        <header class="book-app-header">
            <div class="logo">
            <h3>Books</h3>
            </div>
            <nav>
                <router-link  to="/book">Books</router-link> 
                <span> | </span>
                <router-link to="/search">Search online</router-link> 
            </nav>
        </header>
    `,
};
