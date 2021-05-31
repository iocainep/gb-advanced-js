const goods = [{
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

const renderGoodsItem = (title = "Product name", description = "Product description", price = "Price", picture = "/img/no_photo.jpeg") => {
  return `<div class="goods-item"><h3>${title}</h3><img src="${picture}"><p>${description}</p><p class="price"><b>${price}</b></p></div>`
}

const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.description, item.price, item.picture))
  document.querySelector('.goods-list').innerHTML = goodsList.join("") // так как мы делаем массив через map, то добавляются запятые. С помощью join делаем из массива строку

}

const init = () => {
  renderGoodsList(goods)
}

window.onload = init