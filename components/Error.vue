<template>
  <v-snackbar
      color="blue-grey"
      :timeout="2000"
      v-model="snackbar"
  >
    {{ error }}
<!--    <template v-slot:actions>-->
<!--      <v-btn-->
<!--          color="pink"-->
<!--          variant="text"-->
<!--          @click="snackbar = false"-->
<!--      >-->
<!--        Close-->
<!--      </v-btn>-->
<!--    </template>-->
  </v-snackbar>
</template>

<script>
export default {
  name: "Error",
  props: {
    error: String
  },
  computed: {
    snackbar() {
      if (this.error) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>