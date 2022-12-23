<template>
  <v-container>
    <v-row>
      <v-col
        v-for="post in posts"
        :key="post._id"
        cols="4">

        <v-card
          class="mx-auto"
          max-width="344"
          variant="outlined">

          <nuxt-img
            provider="cloudinary"
            height="200"
            :src="post.url"
          ></nuxt-img>

          <v-card-title>
            {{ post.title }}
          </v-card-title>

          <v-card-subtitle>
            {{ post.text.split(/(?<=[.?!])\s*(?=[A-Z])/)[0] }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
              :to="`post-${post._id}`"
            >
              Read
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    posts: Object,
  }
}
</script>