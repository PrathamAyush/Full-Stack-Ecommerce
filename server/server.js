require("dotenv").config();
const express = require("express");
const app = express();
const port = 3200;
const cors = require("cors")
const mongoose = require("mongoose");
const auth = require("./routes/auth")
const user = require("./routes/userRoutes")
const products = require("./routes/productRoutes")
const cart = require("./routes/cartRoutes")
const order = require("./routes/orderRoutes")

app.use(express.json())

mongoose.set('strictQuery', true);

//calling database connectivity
require("./dataBase/conn");

app.use(cors())
//calling authorization routes for registration and login prossese
app.use("/api/auths/", auth);

//calling userRoutes
app.use("/api/users/", user);

//calling productRoutes
app.use("/api/product/", products);

//calling Cart
app.use("/api/cart/", cart);

//calling order
app.use("/api/order/", order)


app.listen(port, () => {
    console.log("Server started on port", port);
});