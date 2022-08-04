require('dotenv').config();
const app = require("./server");
const PORT = process.env.PORT;

module.exports = app.listen(PORT);