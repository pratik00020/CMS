const mongoose = require("mongoose");

uri = "mongodb+srv://pratik0727:OIhGgfzce2OwVYK9@clustercms.jbrkywx.mongodb.net/New_CMS?retryWrites=true&w=majority&appName=ClusterCMS"

const connectDB = () => {
    console.log("DB connected");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;