require("dotenv").config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

module.exports = {
    database: `mongodb+srv://${username}:${password}@cluster0.2s5jl.mongodb.net/Cluster0?retryWrites=true&w=majority`,
    database: `mongodb+srv://${username}:${password}@cluster0.2s5jl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    secret: 'yoursecret',
}