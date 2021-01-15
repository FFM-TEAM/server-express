import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { MikroORM } from "@mikro-orm/core";
import { MyContext } from "./types";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import express from "express";
import microConfig from "./mikro-orm.config";
import redis from "redis";
import session from "express-session";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  // redis connect
  // DOCS https://github.com/tj/connect-redis
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10년
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "songckey",
      resave: false,
    })
  );
  //apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(4000, () => {
    console.log("server songc localhost: 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
