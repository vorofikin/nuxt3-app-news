<template>
  <v-app dark>
    <NavBar>
    </NavBar>

    <v-app-bar
        :clipped-left="clipped"
        fixed
        app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>English news</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
        :absolute="fixed"
        app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
