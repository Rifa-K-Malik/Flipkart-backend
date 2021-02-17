const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

env.config();

// mongodb connection 

mongoose.connect( `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@node-rest-shop.udknm.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority` ,
    {
    useUnifiedTopology:true,
    useNewUrlParser : true,
    useCreateIndex: true
    }
).then(res=>{console.log('connected')}).catch(err=>{console.log(err)});

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8pl1w.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   )
//   .then(() => {
//     console.log("Database connected");
//   });

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
// app.use(bodyParser());

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
}); 