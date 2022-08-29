const http = require('http');
const express = require('express');
const app = http.createServer(express());

const myConnect = require('./connection').myConnect;

myConnect(()=>{
    app.listen(3003);
})
