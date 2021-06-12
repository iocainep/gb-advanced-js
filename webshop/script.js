const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component('goods-list', {
  props: ['goods'],
  template: `
      <div class="goods-list">
        <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
      </div>
    `
});

Vue.component('goods-item', {
  props: ['goodProp'],
  template: `
      <div class="goods-item" :id="goodProp.id_product">
        <h3 class="goods-item-name">
          {{goodProp.product_name}}
        </h3>
        <img :src="goodProp.picture">
        <p class="goods-item-price">
          {{goodProp.price}}
        </p>
        <button 
          @click="addToBasket(goodProp.id_product)" 
          class="add-to-cart" 
          :id="goodProp.id_product">
        Добавить в корзину
        </button>
      </div>
    `,

  methods: {
    addToBasket(id) {
      const items = app.filteredGoods;
      items.forEach((item) => {
        if (item.id_product == id) {
          const addedItem = {
            id_product: item.id_product,
            product_name: item.product_name,
            price: item.price,
            picture: item.picture
          }
          app.basketItems.push(addedItem);
          app.basketSum += addedItem.price;
        }
      });
    }
  },
});

Vue.component('search', {
  data: function () {
    return {
      searchLine: ''
    }
  },

  template: `
      <div class="search-wrapper">
        <input 
          @keydown.enter="searchGoods" 
          type="text" 
          v-model="searchLine" 
          placeholder="Введите строку поиска"/>
        <button 
          class="search-button"
          type="button"
          @click="searchGoods">
          Искать
        </button>
      </div>
    `,

  methods: {
    searchGoods() {
      const regExp = new RegExp(this.searchLine, 'i')
      app.filteredGoods = app.goods.filter(good => regExp.test(good.product_name))
    },
  },
});

Vue.component('basket-list', {
  props: ['basketItems'],
  template: `
      <div class="basket-list">
        <basket-item 
        v-bind:key="index"
        v-bind:basket-item-id="item.id_product"
        v-for="(item,index) in basketItems"
        :item="item"
        :index="index">
        </basket-item>
      </div>
    `,
});

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
    removeFromCart(index) {
      app.basketItems.splice(index, 1);
      app.basketSum -= app.basketItems[index].price;
    },
  }

});


const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    basketItems: [],
    basketSum: 0,
    searchLine: ''
  },

  methods: {
    async getProducts() {
      const response = await fetch(`${API_URL}/catalogData.json`);
      if (response.ok) {
        const catalogItems = await response.json();
        catalogItems[0].picture = "/webshop/img/laptop.png";
        catalogItems[1].picture = "/webshop/img/mouse.png";
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    }
  },

  async mounted() {
    await this.getProducts()
  },

  computed: {}
});