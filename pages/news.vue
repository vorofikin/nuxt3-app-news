<template>
  <Post
    :posts="posts"
    :is-auth="isAuth"
  ></Post>
</template>

<script>
import { useAppStore } from "~/store/AppStore";
import { usePostStore } from "~/store/PostStore";
import { useUserStore } from "~/store/UserStore";
export default {
  data() {
    return {
      AppStore: useAppStore(),
      PostStore: usePostStore(),
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