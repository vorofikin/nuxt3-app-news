<template>
  <Head>
    <title>News</title>
  </Head>

  <PostCard
    :posts="posts"
    class="hidden-sm-and-down"
  ></PostCard>

  <MobilePostCard
    class="d-md-none"
    :posts="posts"
  ></MobilePostCard>

</template>

<script>
import { useAppStore } from "../store/AppStore";
import Post from "../components/Post";
import { usePostStore } from "../store/PostStore";
import { useUserStore } from "../store/UserStore";
export default {
  name: 'NewsPage',
  components: { Post },
  data() {
    return {
      AppStore: useAppStore(),
      PostStore: usePostStore(),
      UserStore: useUserStore(),
      // width: 960,
    }
  },
  async created() {
    try {
      await this.PostStore.fetchPosts();
    } catch (e) {
      this.AppStore.setFetchPostsError(e);
    }
  },
  computed: {
    posts() {
      return this.PostStore.$state.posts;
    },
    isAuth() {
      return this.UserStore.$state.isAuth;
    },
    width: {
      set(v) {
        this.width = v;
      },
      get() {
        return this.width;
      }
    }
  },
  // mounted() {
  //   this.width = window.innerWidth;
  // },
}
</script>
