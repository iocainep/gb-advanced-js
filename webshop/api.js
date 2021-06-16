const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require('cors');
const app = express();

app.use(bodyParser.json({
  extended: true
}));
app.use(express.static("."));
app.use(cors());

app.listen(3000, () => {
  console.log("server is running at port 3000!!");
});

app.post("/writeLog", (request, res) => {

  fs.readFile("logs.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const logs = JSON.parse(data);
      const newLog = request.body;

      logs.push(newLog);

      fs.writeFile("logs.json", JSON.stringify(logs), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    res.send(data)
  })
})

app.post('/removeFromCart', (request, response) => {
  const req = request.body;
  const productIndex = req.index;
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    const cartData = JSON.parse(data);
    cartData.splice(productIndex, 1);

    fs.writeFile("cart.json", JSON.stringify(cartData), (err) => {
      if (err) {
        response.send('{"result": 0}');
      } else {
        response.send('{"result": 1}');
      }
    });
  })
});

app.get("/catalogData", (req, res) => {
  fs.readFile("catalogData.json", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/addToCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      cart.push(item);

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});