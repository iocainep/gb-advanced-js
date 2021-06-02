class GoodsItem {
  constructor(title = "Product name", description = "Product description", price = "Price", picture = "/img/no_photo.jpeg") {
    this.title = title;
    this.description = description;
    this.price = price;
    this.picture = picture;
  }

  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><img src="${this.picture}"><p>${this.description}</p><p class="price"><b>${this.price}</b></p></div>`
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [{
        title: 'T-Shirt',
        description: "Short sleeved chain brand printed t-shirt",
        price: 150,
        picture: "/img/shirt.webp"
      },
      {
        title: 'Socks',
        description: "Workshop exclusive socks with print",
        price: 50,
        picture: "/img/socks.webp"
      },
      {
        title: 'Jacket',
        description: "Long sleeved blazer with unique tying design",
        price: 350,
        picture: "/img/jacket.webp"
      },
      {
        title: 'Sneakers',
        description: "Vulcanized hybrid sneakers ultra light",
        price: 250,
        picture: "/img/shoes.webp"
      },
    ]
  }

  render() {
    let listAcc = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.description, good.price, good.picture);
      listAcc += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listAcc;
  }

  countSum() {
    let sum = 0;

    this.goods.forEach(good => {
      sum += good.price;
    });

    let span = document.createElement('span');

    span.innerHTML = `Сумма: ${sum} руб.`;

    document.querySelector('main').appendChild(span);

    return sum;
  }
}

class Cart {}

class ItemCart {}

const init = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.countSum();
}

window.onload = init