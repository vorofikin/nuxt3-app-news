<template>
  <InputForm
    :is-auth="isAuth"
  ></InputForm>
</template>

<script>
import { useUserStore } from "~/store/UserStore";
export default {
  data() {
    return {
      UserStore: useUserStore(),
    }
  },
  computed: {
    isAuth() {
      return this.UserStore.$state.isAuth;
    }
  }
}
</script>