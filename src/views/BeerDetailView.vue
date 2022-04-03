<template>
  <v-container :class="['beer-list-view']">
    <v-row
      v-if="filteredList.length > 0 && beerListData.length > 0"
      :class="['my-6']"
    >
      <v-col
        cols="12"
        sm="6"
        lg="4"
        v-for="(beer, index) in filteredList"
        :key="index"
      >
        <BeerDetailComponent
          :beer="beer"
          :cart-include-beer="cartIncludeBeer(beer)"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="beerListData.length == 0" :class="['my-6']">
      <v-col cols="12"> No beers available </v-col>
    </v-row>
    <v-row v-else-if="filteredList.length == 0" :class="['my-6']">
      <v-col cols="12" :class="['text-center']">
        <h1>No result from search</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import BeerDetailComponent from "@/components/BeerDetailComponent";

export default {
  name: "BeerDetailView",
  components: {
    BeerDetailComponent,
  },
  computed: {
    ...mapGetters({
      beerListData: "beer/getBeerList",
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
      return this.beerListData.filter((beer) =>
        this.conditionEmptyValueSearchBeer
          ? beer.name.toLowerCase().includes(this.valueToSearch.toLowerCase())
          : beer
      );
    },
  },
  methods: {
    cartIncludeBeer(beerToFind) {
      var exists = this.cartList.some(function (cart) {
        return cart.id === beerToFind.id;
      });

      if (exists) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
