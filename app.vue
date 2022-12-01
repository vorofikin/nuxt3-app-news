<template>
  <v-app>
    <NavBar
        :clipped="clipped"
        :drawer="drawer"
        :mini-variant="miniVariant"
        :username="username"
        :email="email"
        :isAuth="isAuth">
    </NavBar>

    <v-app-bar
        :clipped-left="clipped"
        fixed
        app
    >
      <div class="d-lg-none">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>
      <v-toolbar-title>English news</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer
        :absolute="fixed"
        app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
  <Error v-if="error"
         :error="error"></Error>
</template>

<script>
import NavBar from "./components/NavBar";
import { useTheme } from "vuetify";
import { useAppStore } from "./store/AppStore";
import { useUserStore } from "./store/UserStore";
export default {
  name: 'DefaultLayout',
  components: { NavBar },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      theme: useTheme(),
      AppStore: useAppStore(),
      UserStore: useUserStore(),
      localStorage: window.localStorage,
    }
  },
  created() {
    this.theme.global.name = this.AppStore.$state.currentTheme;
    console.log(this.AppStore.$state.currentTheme);
  },
  computed: {
    currentTheme: {
      set(val) {
        this.AppStore.$state.currentTheme = val;
      },
      get() {
        return this.AppStore.$state.currentTheme;
      }
    },
    isAuth() {
      return !!this.UserStore.$state.token || !!localStorage.getItem('user');
    },
    username() {
      if (localStorage.getItem('user')) {
        const { firstName, lastName } = JSON.parse(localStorage.getItem('user'));
        return `${firstName} ${lastName}`;
      } else {
        return this.UserStore.$state.fullname;
      }
    },
    email() {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user')).email;
      } else {
        return this.UserStore.$state.fullname;
      }
    },
    error() {
      return this.AppStore.$state.authError ||
          this.AppStore.$state.registerError ||
          this.AppStore.$state.validationError;
    }
  }
}
</script>
