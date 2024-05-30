const express = require('express');
const app = express();
const userRoute= require('./routes/userRoute');
const mongoose = require('mongoose');
const User = require('./api/models/userModel');
const cors= require('cors');
app.use(cors());

mongoose.connect("mongodb+srv://gma82960:AryanHarshal%40%23%24123@cluster0.0ykgggq.mongodb.net/crudMern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB connected successfully");
})
.catch((error) => {
    console.log("error", error);
});

app.use(express.json());

// Create Routes
app.use('/user',userRoute);




app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
