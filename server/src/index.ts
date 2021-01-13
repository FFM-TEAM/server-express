import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
   await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: "test post" });
  // await orm.em.persistAndFlush(post);
  // console.log("__________________________sql__________");
  // await orm.em.nativeInsert(Post, { title: "my first post 2" });
  // const post = new Post('my first post')
};

main().catch((err) => {
  console.log(err);
});
