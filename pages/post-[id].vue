<template>
  <Post
  ></Post>
</template>

<script>
import { usePostStore } from "~/store/PostStore";
import { useAppStore } from "~/store/AppStore";
import { useUserStore } from "~/store/UserStore";
import Post from "../components/Post";
export default {
  components: { Post },
  data() {
    return {
      PostStore: usePostStore(),
      AppStore: useAppStore(),
      UserStore: useUserStore(),
    }
  },
  async created() {
    try {
      this.AppStore.resetErrors();
      await this.PostStore.getPost(this.$route.params.id);
    } catch (e) {
      this.AppStore.setFetchOnePostError(e);
    }
  },
  computed: {
    posts() {
      return this.PostStore.$state.onePost;
    },
    isAuth() {
      return this.UserStore.$state.isAuth;
    }
  },
}
</script>