import "reflect-metadata";

import { COOKIE_NAME, __prod__ } from "./constants";

import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { MyContext } from "./types";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolvers/post";
import Redis from "ioredis";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import express from "express";
import session from "express-session";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "songc21",
    username: "songc21",
    password: "songc21",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User],
  });
  await conn.runMigrations();

  const app = express();

  // redis connect
  // DOCS https://github.com/tj/connect-redis
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
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
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

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
