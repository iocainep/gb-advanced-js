const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  render() {
    return `<div class="goods-item" itemId=${this.id}><h3>${this.title}</h3><p>${this.price}</p><button onclick="cart.addToCart(${this.id})" class="add-to-cart" id="${this.id}">Добавить в корзину</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  countSum() {
    let sum = 0;

    this.goods.forEach(good => {
      sum += good.price;
    });

    // let span = document.createElement('span');
    // span.innerHTML = `Сумма: ${sum} руб.`;
    // document.querySelector('main').appendChild(span);

    return sum;
  }
}

class Cart {
  constructor() {
    this.cartList = [];
  }

  addToCart(id) {

    list.goods.forEach(good => {
      if (good.id_product == id) {
        this.cartList.push(good)
        document.querySelector('.cart-button').innerHTML = `В корзине: ${cart.goodsCount()}`;
      }
    })
    this.render()
  }

  removeFromCart(id) {}

  render() {

    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    this.cartList.forEach(item => {
      cartList.innerHTML += `<div class="cart-item"><p>${item.product_name}</p><button onclick="cart.removeFromCart(${item.id_product})" class="cart-item-remove">X</button></div>`
    })
  }

  goodsCount() {
    return this.cartList.length
  }
}

const cart = new Cart(); // почему если занести это в init, то этих классов не видно?
const list = new GoodsList();

const init = async () => {
  await list.fetchGoods();
  list.render();
  list.countSum();
}

window.onload = init