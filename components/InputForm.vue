<template>
  <v-row justify="center" align="center">
    <v-col class="text-center" cols="12" sm="8" md="8">
      <v-form>
        <v-card>
          <v-card-item>
            <v-text-field
            v-model="title"
            :disabled="!isAuth"
            label="Title of your post"
            variant="filled"
            ></v-text-field>
          </v-card-item>
          <v-card-item>
            <v-textarea
                v-model="inputText"
                :disabled="!isAuth"
                variant="filled"
                auto-grow
                label="What`s new?"
                rows="2"
                row-height="20"
            ></v-textarea>
          </v-card-item>
          <v-card-actions>
            <v-file-input
                :disabled="!isAuth"
                label="Choose a picture"
                show-size
                @change="handleFileUpload"
            ></v-file-input>
          </v-card-actions>
          <v-card-actions>
            <v-spacer />
            <v-btn
                :disabled="!isAuth || maximumFileSize"
                color="primary"
                nuxt
                type="submit"
                @click.prevent="addPost"
            >
              Post
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import AppStateEnum from "../utils/AppStateEnum";
import { useAppStore } from "../store/AppStore";
import { usePostStore } from "../store/PostStore";
export default {
  props: {
    isAuth: Boolean,
  },
  data() {
    return {
      inputText: '',
      title: '',
      file: {},
      AppStore: useAppStore(),
      PostStore: usePostStore(),
      maximumFileSize: false,
    }
  },
  methods: {
    async handleFileUpload(e) {
      this.maximumFileSize = false;
      const file = e.target.files[0];

      if (file.size > AppStateEnum.MAX_FILE_SIZE) {
        this.AppStore.setFileUploadError('File size must be less than 5 MB');
        this.maximumFileSize = true;
      }
      this.convertToBase64(file);
    },
    async convertToBase64(file) {
      try {
        const readData = (f) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(f);
          });
        }
        this.file = await readData(file);
      } catch (e) {
        this.AppStore.setFileUploadError(e);
      }
    },
    async addPost() {
      try {
        await this.PostStore.addPost(this.title, this.inputText, this.file);
      } catch (e) {
        this.AppStore.setAddPostError(e);
      }
    }
  },
}
</script>