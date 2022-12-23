import { defineStore } from "pinia";
import { useAppStore } from "~/store/AppStore";
import { useUserStore } from "~/store/UserStore";
import AppStateEnum from "~/utils/AppStateEnum";
import appStateEnum from "~/utils/AppStateEnum";

export const usePostStore = defineStore('PostStore', {
  state: () => ({
    posts: {},
    onePost: {},
  }),
  actions: {
    async fetchPosts() {
      try {
        const resp = await $fetch("api/posts", {
          method: "post"
        });
        this.posts = {...resp};
      } catch (e) {
        const AppStore = useAppStore();
        AppStore.setFetchPostsError(e);
      }
    },
    async addPost(title, text, uploadedFile) {
      try {
        const response = await $fetch('api/image-upload', {
          method: 'POST',
          body: {
            title: title,
            text: text,
            file: uploadedFile
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getPost(id) {
      try {
        let response = await $fetch('api/news', {
          method: 'POST',
          body: {
            id: id
          }
        });
        const UserStore = useUserStore();
        if (!UserStore.$state.isAuth) {
          const valid = response.text.split(/(?<=[.?!])\s*(?=[A-Z])/);
          if (valid.length > AppStateEnum.MAX_NUM_OF_SENT) {
            response.text = valid.splice(appStateEnum.MAX_NUM_OF_SENT + 1,
              valid.length - 1 - appStateEnum.MAX_NUM_OF_SENT).join(' ');
            response.text += '..';
            response.spliced = true;
          }
        }
        this.onePost = response;
      } catch (e) {
        console.log(e);
      }
    },
    destroyPost() {
      this.onePost = {};
    }
  },
  getters: {
  },
  persist: true
})