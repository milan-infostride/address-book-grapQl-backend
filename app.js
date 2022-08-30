const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const graphQlResolver = require('./graphQl/resolvers');
const graphQlSchema = require('./graphQl/schema');
const {graphqlHTTP} = require('express-graphql');

const myConnect = require('./connection').myConnect;

app.use(require('cors')())

app.use((req,res,next)=>{

    if(req.method ==='OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

app.use('/graphql',graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
}))

myConnect(()=>{
    server.listen(8080,()=>{
        console.log('server connected');
    });
})