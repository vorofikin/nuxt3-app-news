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
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item v-if="isAuth"
          prepend-avatar="https://i.scdn.co/image/ab6761610000e5eb7d9057fc2e7f24caec5cdbed"
          :title="username"
          :subtitle="email">
        </v-list-item>

        <v-list-item v-else>
          <v-btn
            to="/registration">Sign up
          </v-btn>

          <v-btn
            to="/login">Login
          </v-btn>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          active-color="primary"
          variant="plain"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"
            ></v-icon>
          </template>

          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="isAuth"
          router
          exact
          active-color="primary"
          variant="plain"
          to="/create-post"
        >
          <template v-slot:prepend>
            <v-icon
              icon="mdi-cancel"
            ></v-icon>
          </template>
          <v-list-item-title>
            Create post
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-footer v-if="isAuth">
        <v-list>
          <v-list-item
            router
            exact
            active-color="primary"
            variant="plain"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-cancel"></v-icon>
            </template>

            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-footer>
    </v-navigation-drawer>

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
  <Error
    v-if="error"
    :error="error"
  ></Error>
</template>

<script>
import NavBar from "./components/NavBar";
import { useTheme } from "vuetify";
import { useAppStore } from "./store/AppStore";
import { useUserStore } from "./store/UserStore";
import { useOnline } from "@vueuse/core";
import {el} from "vuetify/locale";
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
      online: useOnline(),
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'News',
          to: '/posts'
        },
        {
          icon: 'mdi-wrench',
          title: 'Settings',
          to: '/settings'
        }
      ],
    }
  },
  created() {
    this.theme.global.name = this.AppStore.$state.currentTheme;
  },
  computed: {
    currentTheme() {
      return this.AppStore.$state.currentTheme;
    },
    isAuth() {
      return this.UserStore.$state.isAuth;
    },
    username() {
      return this.UserStore.$state.fullname;
    },
    email() {
      return this.UserStore.$state.email;
    },
    error() {
      return this.AppStore.$state.authError ||
        this.AppStore.$state.registerError ||
        this.AppStore.$state.validationError ||
        this.AppStore.$state.fetchPostsError ||
        this.AppStore.$state.fileUploadError ||
        this.AppStore.$state.fetchOnePostError ||
        this.AppStore.$state.addPostError ||
        this.AppStore.$state.deleteAccountError ||
        this.AppStore.$state.deleteAccountSuccess ||
        this.AppStore.$state.msgForOffline;
    }
  },
  watch: {
    online() {
      if (!this.online) {
        this.AppStore.setNetworkStatus(true);
      } else {
        this.AppStore.setNetworkStatus(false);
      }
    }
  }
}
</script>
