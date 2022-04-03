const getters = {
  getBeerList(state) {
    return state.beerList;
  },
  getCartList(state) {
    return state.cartList;
  },
  getValueToSearch(state) {
    return state.searchBeer;
  },
};

export default getters;
