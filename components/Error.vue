<template>
  <v-snackbar
      color="blue-grey"
      :timeout="2000"
      v-model="snackbar"
  >
    {{ error }}
    <template v-slot:actions>
      <v-btn
          color="pink"
          variant="text"
          @click="closeSnackbar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useAppStore } from "../store/AppStore";
export default {
  name: "Error",
  props: {
    error: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isShown: false,
      AppStore: useAppStore(),
    }
  },
  computed: {
    snackbar() {
      return !!this.error;
    },
  },
  methods: {
    closeSnackbar() {
      this.isShown = false;
      this.AppStore.resetErrors();
    },
  }
}
</script>