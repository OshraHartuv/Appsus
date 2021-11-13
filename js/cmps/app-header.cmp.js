export default {
    template: `
    <header class="app-header">
        
        <nav>
            <router-link to="/" active-class="active-link" exact>
                <div class="logo">
                    <img src="img/logo.png">
                </div>
            </router-link>
            <router-link active-class="active" class="header-link" to="/mail">Mail </router-link>|
            <router-link class="header-link" to="/keep">Keep</router-link>|
            <router-link class="header-link" to="/books">Books</router-link>
        </nav>
    </header>
    `,
}