const path = require(`path`);
const express = require(`express`);

const app = express();

app.get(`/`, function (req, res) {
  const htmlFIlePath = path.join(__dirname, `views`, `index.html`);
  res.sendFile(htmlFIlePath);
});

app.get(`/restaurants`, function (req, res) {
  const htmlFIlePath = path.join(__dirname, `views`, `restaurants.html`);
  res.sendFile(htmlFIlePath);
});

app.get(`/recommend`, function (req, res) {
  const htmlFIlePath = path.join(__dirname, `views`, `recommend.html`);
  res.sendFile(htmlFIlePath);
});

app.get(`/confirm`, function (req, res) {
  const htmlFIlePath = path.join(__dirname, `views`, `confirm.html`);
  res.sendFile(htmlFIlePath);
});

app.get(`/about`, function (req, res) {
  const htmlFIlePath = path.join(__dirname, `views`, `about.html`);
  res.sendFile(htmlFIlePath);
});

app.listen(3000);
