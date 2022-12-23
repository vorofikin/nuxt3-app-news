<template>
  <v-row justify="center" align="center"
  >
    <v-col
      class="text-center"
      cols="12" sm="8" md="8">
      <v-card
      >
        <v-banner
          class="justify-center text-h5 font-weight-light"
          style="font-family: Dubai"
          sticky
        >
          <v-btn
            to="/posts"
            icon="mdi-arrow-left"
          ></v-btn>
          {{ post.title }}
        </v-banner>

        <v-card-text
          align="left"
          style="font-family: Dubai;
          font-size: larger"
        >
          {{ post.text }}
        </v-card-text>

        <v-card-actions
            v-if="post.spliced"
        >
          <v-card-text
            style="font-style: oblique"
          >
            Want to read full post? Please, login or register:
          </v-card-text>
          <br>
          <v-btn
            to="/registration"
            color="primary"
          >Sign up
          </v-btn>
          <v-btn
            to="/login"
            color="primary"
          >Login
          </v-btn>
        </v-card-actions>
        <v-img
          v-if="!isAuth"
          :lazy-src="`https://res.cloudinary.com/dh8nk2ae4/image/upload/v1670073043/${post.url}`"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-card-text
                style="font-style: oblique"
              >
                Want to see the image? Please,
                <nuxt-link
                  to="/login"
                >
                  <code>login</code>
                </nuxt-link> or
                <nuxt-link
                  to="/registration"
                >
                  <code>Register</code>
                </nuxt-link>
              </v-card-text>
            </div>
          </template>
        </v-img>
        <v-img
          v-else
          :src="`https://res.cloudinary.com/dh8nk2ae4/image/upload/v1670073043/${post.url}`"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {usePostStore} from "~/store/PostStore";
import {useUserStore} from "~/store/UserStore";
export default {
  data() {
    return {
      PostStore: usePostStore(),
      UserStore: useUserStore(),
      config: useRuntimeConfig(),
    }
  },
  computed: {
    post() {
      return this.PostStore.$state.onePost || "Loading";
    },
    isAuth() {
      return this.UserStore.$state.isAuth;
    }
  },
}
</script>
