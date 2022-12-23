<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-container>
      <v-row>
        <v-col
          v-for="post in posts"
          :key="post._id"
          cols="12">
          <v-card
            variant="outlined"
          >

            <div
              class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>
                  {{ post.title }}
                </v-card-title>

                <v-card-actions>
                  <v-btn
                    color="orange-lighten-2"
                    variant="text"
                    :to="`post-${post._id}`"
                  >
                    Read
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <nuxt-img
                  provider="cloudinary"
                  height="200"
                  :src="post.url"
                ></nuxt-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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