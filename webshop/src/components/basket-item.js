import {API_URL} from '../script.js';

Vue.component('basket-item', {
    props: ['item', 'index'],
    template: `
        <div class="basket-item">
          <h3 
            class="basket-item__title">
          {{item.product_name}}
          </h3>
          <img 
            :src="item.picture">
          <p 
            class="basket-item__price">
          {{item.price}}
          </p>
          <button 
            @click="removeFromCart(index)" 
            class="remove-from-cart">
            Удалить из корзины
          </button>
        </div>
    `,
  
    methods: {
      async removeFromCart(index) {
        this.$root.basketSum -= this.$root.fetchBasket[index].price;
        this.$root.fetchBasket.splice(index, 1);
        this.$root.writeLog(this.item.id_product, "removefromcart");
        const data = JSON.stringify({
          index: index
        });
        const body = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: data
        };
        const response = await fetch(`${API_URL}/removeFromCart`, body);
      },
  
    }
  });

export default {
    name: 'basket-item'
}