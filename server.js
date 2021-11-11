require('dotenv').Config();
const express = require('express');
const axios = require('axios');

const app = express();




app.listen(process.env.PORT, () => {
console.log('app running on 5000');

});