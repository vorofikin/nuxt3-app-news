<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-card>
        <v-card-title>
          Enable dark mode?
        </v-card-title>
        <v-card-subtitle>
          <v-switch
              v-model="currentTheme"
              inset
              color="info"
              @click="toggleTheme"
              :label="currentTheme"></v-switch>
        </v-card-subtitle>
      </v-card>

    </v-col>
  </v-row>

  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-card>
        <v-card-title>
          Delete account
        </v-card-title>
        <v-card-subtitle>
          <v-btn
              color="error"
              size="small"
              @click="deleteAccount">
            Delete
          </v-btn>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useTheme } from "vuetify";
import {useAppStore} from "~/store/AppStore";
import { useUserStore } from "~/store/UserStore";
export default {
  data() {
    return {
      appStore: useAppStore(),
      theme: useTheme(),
      UserStore: useUserStore(),
    }
  },
  methods: {
    toggleTheme() {
      const currentTheme = this.theme.global.name;
      this.theme.global.name = currentTheme === 'dark' ?
          'light' : 'dark';
      this.appStore.setThemeMode(this.theme.global.name);
    },
    async deleteAccount() {
      await this.UserStore.deleteUserAccount();
    }
  },
  computed: {
    currentTheme() {
      return this.appStore.$state.currentTheme;
    }
  },
}
</script>