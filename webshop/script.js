const API_URL = "http://localhost:3000";
const TODAY = new Date();

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
  methods: {
    async addToCart() {
      const addedProduct = JSON.stringify(this.goodProp);
      app.basketItemsFront.push(this.goodProp);
      app.writeLog(this.goodProp.id_product, "addtocart");
      const body = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: addedProduct
      };
      const response = await fetch(`${API_URL}/addToCart`, body);
      app.basketSum += this.goodProp.price;
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
    async removeFromCart(index) {
      app.basketSum -= app.basketItemsFront[index].price;
      app.basketItemsFront.splice(index, 1);
      app.writeLog(this.item.id_product, "removefromcart");
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


const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    basketItems: [],
    basketItemsFront: [],
    basketSum: 0,
    searchLine: ''
  },

  methods: {
    async getProducts() {
      const response = await fetch(`${API_URL}/catalogData`);
      if (response.ok) {
        const catalogItems = await response.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    },

    async showCart() {
      const response = await fetch(`${API_URL}/cartData`);
      if (response.ok) {
        const cartData = await response.json();
        this.basketItems = cartData;
        this.basketItemsFront = cartData;
      } else {
        alert("Ошибка при соединении с сервером");
      }
      this.basketItems.forEach(item => {
        this.basketSum += item.price;
      })
    },

    async writeLog(id, action) {
      const logData = {
        "action": action,
        "id": id,
        "time": TODAY
      };

      const body = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(logData)
      };
      const response = await fetch(`${API_URL}/writeLog`, body);
    },

    async getCartSum() {
      this.basketItems.forEach(item => {
        app.basketSum += item.price;
      })
    }
  },

  async mounted() {
    await this.getProducts()
  },

  beforeMount() {
    this.showCart(),
      this.getCartSum()
  }
});