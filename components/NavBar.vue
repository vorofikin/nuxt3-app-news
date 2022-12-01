<template>
  <v-navigation-drawer
      expand-on-hover
      floating
      app
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
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-footer v-if="isLoggedOut">
      <v-list>
        <v-list-item
            router
            exact
            active-color="primary"
            variant="plain"
            @click="signOut"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-cancel"></v-icon>
          </template>

          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-footer>

  </v-navigation-drawer>
</template>

<script>
import { useUserStore } from "../store/UserStore";
export default {
  name: "NavBar",
  props: {
    drawer: Boolean,
    clipped: Boolean,
    username: String,
    email: String,
    isAuth: Boolean
  },
  data() {
    return {
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
      UserStore: useUserStore(),
    }
  },
  computed: {
    isDrawer() {
      return this.drawer;
    },
    miniVariant() {
      return !this.drawer;
    },
    // fullname() {
    //   return localStorage.getItem('fullname');
    // },
    isLoggedOut() {
      return !this.UserStore.$state.fullname;
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('user');
      this.UserStore.resetUserData();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
