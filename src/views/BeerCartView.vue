<template>
  <v-container :class="['beer-cart-view']">
    <v-row
      v-if="cartList.length > 0 && filteredList.length > 0"
      :class="['my-6']"
    >
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="(beer, index) in cartList"
        :key="index"
      >
        <BeerCartComponent :beer="beer" />
      </v-col>
    </v-row>
    <v-row v-else-if="cartList.length == 0" :class="['my-6']">
      <v-col cols="12" :class="['text-center']">
        <h1>You have not added any beers to your cart!</h1>
      </v-col>
    </v-row>
    <v-row v-else :class="['my-6']">
      <v-col cols="12" :class="['text-center']">
        <h1>No result from search</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import BeerCartComponent from "@/components/BeerCartComponent";

export default {
  name: "BeerCartView",
  components: {
    BeerCartComponent,
  },
  computed: {
    ...mapGetters({
      cartList: "beer/getCartList",
      valueToSearch: "beer/getValueToSearch",
    }),
    conditionEmptyValueSearchBeer() {
      return (
        this.valueToSearch != "" &&
        this.valueToSearch != null &&
        this.valueToSearch != undefined
      );
    },
    filteredList() {
      return this.cartList.filter((beer) =>
        this.conditionEmptyValueSearchBeer
          ? beer.name.toLowerCase().includes(this.valueToSearch.toLowerCase())
          : beer
      );
    },
  },
  watch: {
    valueToSearch(val) {
      console.log("valueToSearch:", val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
