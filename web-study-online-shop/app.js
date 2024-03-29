const path = require(`path`);

const express = require(`express`);
const csrf = require(`csurf`);
const expressSession = require(`express-session`);

const createSessionConfig = require(`./config/session`);
const db = require(`./data/database`);
const addCsrfTokenMiddleware = require(`./middleware/csrf-token`);
const errodHandlingMiddleware = require(`./middleware/error-handler`);
const checkAuthMiddleware = require(`./middleware/check-auth`);
const protectRoutesMiddleware = require(`./middleware/protect-routes`);
const cartMiddleware = require(`./middleware/cart`);
const updateCartPricesMiddleware = require("./middleware/update-cart-prices");
const notFoundHandlerMiddleware = require(`./middleware/not-found`);
const authRoutes = require(`./routes/auth-routes`);
const productRoutes = require(`./routes/products-routes`);
const baseRoutes = require(`./routes/base-routes`);
const adminRoutes = require(`./routes/admin-routes`);
const cartRoutes = require(`./routes/cart-routes`);
const orderRoutes = require(`./routes/orders-routes`);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(`/products/assets`, express.static(`product-data`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(`/cart`, cartRoutes);
app.use(`/orders`, protectRoutesMiddleware, orderRoutes);
app.use(`/admin`, protectRoutesMiddleware, adminRoutes);

app.use(notFoundHandlerMiddleware);

app.use(errodHandlingMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log(`Failed to connect to the database`);
    console.log(error);
  });
