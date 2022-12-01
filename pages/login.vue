<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-form
          ref="form"
          lazy-validation
          @keydown.enter="login"
      >
        <v-text-field
            v-model="userCreds.email"
            :counter="10"
            :rules="emailRules"
            :loading="isLoading"
            label="Email"
            required
        ></v-text-field>
        <v-text-field
            v-model="userCreds.password"
            :loading="isLoading"
            label="Password"
            required
        ></v-text-field>
        <v-btn
            color="success"
            class="mr-4"
            @click="validate"
        >
          Login
        </v-btn>

        <v-btn
            color="error"
            class="mr-4"
            @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import {useUserStore} from "../store/UserStore";
import {useAppStore} from "../store/AppStore";
export default {
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      isLoading: false,
      error: null,
      userCreds: {
        email: '',
        password: ''
      },
      UserStore: useUserStore(),
      AppStore: useAppStore(),
    }
  },
  methods: {
    async validate() {
      this.AppStore.resetErrors();
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.login();
      } else {
        this.AppStore.setValidationError("Your form must be valid");
      }
    },
    async login() {
      this.isLoading = true;
      try {
        await this.UserStore.login(this.userCreds);
        this.$router.push('/');
      } catch (e) {
        this.AppStore.setAuthError(e);
      } finally {
        this.isLoading = false;
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>