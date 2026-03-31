const express = require('express');
const cors = require('cors');
require('dotenv').config({quiet:true});


const connectDB = require('./Config/Db');
const { connectCloudinary } = require("./Config/Cloudnary");



const adminRoutes = require("./routes/AdminRoutes");
const userRouter = require('./routes/userRoutes');
const productrouter = require('./routes/ProductRoutes');
const Cartrouter = require('./routes/CartItemRoutes')
const OrderROuter = require('./routes/OrderRoute'); 
const orderRouter = require('./routes/OrderRoute');

// app config
const app = express();
const port = process.env.PORT;

console.log( "port no ",port)

// database connections
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint
app.get('/', (req, res) => {
    res.send('API Working');
});


// routes
app.use("/api/admin", adminRoutes);
app.use('/api/user', userRouter);
app.use('/api/product', productrouter);
app.use('/api/cart',Cartrouter);
app.use('/api/order',orderRouter )

// server listen
app.listen(port, () => {
    console.log("Server started on port " + port);
});