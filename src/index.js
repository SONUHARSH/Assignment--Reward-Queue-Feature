const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const { ServerConfig, Db } = require('./config');
const apiRoutes = require('./routes');


require('./utils/scheduler'); 


app.use(express.json());
app.use(bodyParser.json());

app.use('/api', apiRoutes);

//console.log('Loaded Environment Variables:', process.env);


app.listen( ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT :${ServerConfig.PORT}`);

});


