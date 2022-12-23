<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @keydown.enter="validate"
      >
        <v-text-field
            v-model="user.firstName"
            :counter="10"
            :rules="firstNameRules"
            :loading="isLoading"
            label="First name"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="user.lastName"
            :counter="10"
            :rules="lastNameRules"
            :loading="isLoading"
            label="Last name"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="user.email"
            :rules="emailRules"
            :loading="isLoading"
            label="E-mail"
            clearable
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          name="input-10-1"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :loading="isLoading"
          label="Password"
        ></v-text-field>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            :loading="isLoading"
            label="Do you agree?"
        ></v-checkbox>

        <v-btn
            color="success"
            class="mr-4"
            @click="validate"
        >
          Register
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
  name: "RegistrationPage",
  components: { Error },
  data(){
    return {
      valid: true,
      firstName: '',
      firstNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        v => (v && v.length >= 2) || 'First name should not be less than 1 characters',
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 10) || 'Last name must be less than 20 characters',
        v => (v && v.length >= 2) || 'Last name should not be less than 1 characters',
      ],
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      select: null,
      checkbox: false,
      isLoading: false,
      error: null,
      UserStore: useUserStore(),
      AppStore: useAppStore(),
      showPassword: false
    }
  },
  methods: {
    async validate () {
      this.AppStore.resetErrors();
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.register();
      } else {
        this.AppStore.setValidationError("Your form must be valid");
      }
    },
    async register() {
      this.isLoading = true;
      try {
        await this.UserStore.registration(this.user);
      } catch (e) {
        this.AppStore.setRegisterErrpr(e);
      } finally {
        this.isLoading = false;
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  },
  computed: {
  }
}
</script>