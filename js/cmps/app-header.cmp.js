export default {
    template: `
        <header class="app-header">
        <router-link to="/" active-class="active-link" exact>
             <div class="logo">
                <h3>Appsus</h3>
            </div>
        </router-link>
            <nav>
                <router-link active-class="active" to="/mail">Mail </router-link>|
                <router-link to="/keep">Keep</router-link>
            </nav>
        </header>
    `,
}