export const API_URL = "http://localhost:3000";
const TODAY = new Date();
import goodsList from './components/goods-list.js';
import goodsItem from './components/goods-item.js';
import search from './components/search.js';
import basketList from './components/basket-list.js';
import basketItem from './components/basket-item.js';

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    basketItems: [],
    fetchBasket: [],
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
        this.fetchBasket = cartData;
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
      console.log(response);
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

