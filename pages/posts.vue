<template>
  <v-row justify="center" align="center">
    <v-col class="text-center" cols="12" sm="8" md="8">
      <v-card v-for="news in posts">
        <v-card-title>
          {{ news.title }}
        </v-card-title>
        <v-card-text
        align="left">
          {{ news.text }}
        </v-card-text>
<!--        <v-img-->
<!--          src="https://traktorist.ua/media/brands/1276/samedeutz-fahrgrouplogo-553175.jpg">-->
<!--        </v-img>-->
        <v-rating
          v-model="news.rating"
          hover
          half-increments
          ></v-rating>
        <pre>{{ news.rating }}</pre>
      </v-card>
    </v-col>
  </v-row>


</template>

<script>
// const components = import.meta.static("~/news/firstpost.json");
import news from '~/assets/news/firstpost.json';
import {useAppStore} from "../store/AppStore";
export default {
  name: 'InspirePage',
  data() {
    return {
      posts: null,
      rating: 2.5,
      AppStore: useAppStore(),
    }
  },
  async created() {
    try {
      const resp = await $fetch("api/posts", {
        method: "post"
      });
      this.posts = resp;
    } catch (e) {
      // this.AppStore.set
    }
  }
}
</script>
