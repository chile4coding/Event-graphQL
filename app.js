const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const isAuth = require("./middleware/isAuth");

const graphQLResolvers = require("./graphql/resolvers/index");

const mongoose = require("mongoose");

const schema = require("./graphql/schema");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,GET,OPTIONS, DELETE, PUT, PATCH "
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.jv9eo4u.mongodb.net/${process.env.MONGODB_DATABSE_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("running");
    });
  });
