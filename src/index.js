const express = require('express');
const {ServerConfig:{PORT},Logger} = require('./config');
const apiRoutes =require('./routes');
const { Auth } = require('./utils/common');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 *1000, // 2 minutes
    max: 3, // limit each IP to 2 requests per 'window' (here , per 2 minutes)
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);

app.use('/api',apiRoutes);


app.listen(PORT,()=>{
    console.log(`Successfully started the server on PORT ${PORT} `); 
    Logger.info("Successfully started server"," root ", {});
});
