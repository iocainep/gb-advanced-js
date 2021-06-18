import {API_URL} from '../script.js';

Vue.component('goods-item', {
    props: ['goodProp'],
    methods: {
      async addToCart() {
        const addedProduct = JSON.stringify(this.goodProp);
        this.$root.fetchBasket.push(this.goodProp);
        this.$root.writeLog(this.goodProp.id_product, "addtocart");
        const body = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: addedProduct
        };
        const response = await fetch(`${API_URL}/addToCart`, body);
        this.$root.basketSum += this.goodProp.price;
      }
    },
    template: `
      <div 
        class="goods-item" 
        :id="goodProp.id_product">
        <h3 class="goods-item-name">
            {{goodProp.product_name}}
        </h3>
        <img :src="goodProp.picture">
        <p class="goods-item-price">
          {{goodProp.price}}
        </p>
        <button
          type="button"
          @click = "addToCart()"
          class="add-to-cart"
          :id="goodProp.id_product"
          >
          Добавить в корзину
        </button>
      </div>
    `,
  });

export default {
    name: "goods-item"
}