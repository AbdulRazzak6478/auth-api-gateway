const express = require('express');
const {ServerConfig:{PORT},Logger} = require('./config');
const apiRoutes =require('./routes');
const { Auth } = require('./utils/common');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);


app.listen(PORT,()=>{
    console.log(`Successfully started the server on PORT ${PORT} `); 
    Logger.info("Successfully started server"," root ", {});
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGIuY29tIiwiaWF0IjoxNjk2Mjg1MTgwLCJleHAiOjE2OTYyODg3ODB9.v2DV3-9IsM3JZsP-UUCPvu-kAKWtRlzLOc8_LjqBz_o';
    // const response = Auth.verifyToken(token);
    // console.log(response);
});
