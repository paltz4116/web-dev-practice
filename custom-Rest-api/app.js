const express = require(`express`);

const app = express();

app.get(`/quote`, function (req, res, next) {
  res.json({
    quote: `Testing rest api`,
  });
});

app.listen(3000);
