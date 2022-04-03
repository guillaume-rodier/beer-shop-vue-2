<template>
  <v-app-bar
    app
    color="primary"
    elevation="4"
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

    <v-toolbar-title
      :class="['white--text', 'font-weight-medium', classDesktop]"
    >
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

    <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>

    <v-text-field
      v-model="search"
      label="Search a beer"
      solo
      flat
      dense
      outlined
      clearable
      hide-details
      @input="updateSearchBeerStore"
    />
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

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
  computed: {
    classDesktop() {
      switch (true) {
        case this.$vuetify.breakpoint.mdAndUp:
          return "ml-4";
        default:
          return "pl-2 pr-3";
      }
    },
  },
  data() {
    return {
      drawer: false,
      search: "",
    };
  },
  methods: {
    ...mapActions({
      updateSearchBeer: "beer/updateSearchBeer",
    }),
    redirection(routeName) {
      this.$emit("redirection", { name: routeName });
    },
    activeBtnClass(route) {
      if (this.$route.name === route) {
        return "active-btn grey";
      }
    },
    updateSearchBeerStore() {
      this.updateSearchBeer(this.search);
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
