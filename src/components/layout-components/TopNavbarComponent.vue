<template>
  <v-app-bar
    app
    color="primary"
    elevation="24"
    position="top"
    border="true"
    height="50"
    :class="['app-nav-style']"
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.smAndDown"
      variant="text"
      color="white"
      @click="$emit('open-sidebar', true)"
    ></v-app-bar-nav-icon>

    <v-toolbar-title :class="['ml-4', 'white--text', 'font-weight-medium']">
      Beer shop
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn
        v-for="(button, index) in buttonsNavbar"
        color="title"
        text
        :key="index"
        :class="[activeBtnClass(button.redirection)]"
        @click="redirection(button.redirection)"
      >
        {{ button.title }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopNavbarComponent",
  props: {
    buttonsNavbar: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    redirection(routeName) {
      this.$emit("redirection", { name: routeName });
    },
    activeBtnClass(route) {
      if (this.$route.name === route) {
        return "active-btn grey";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-nav-style {
  .active-btn {
    font-weight: bold;
  }
}
</style>
