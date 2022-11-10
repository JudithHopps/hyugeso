/*
// EXPRESS MODULES
import express from 'express';
import type { Request, Response } from 'express';
// MONGODB MODULES
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import type { User } from './mongodb/types';
import { createUser } from './mongodb/modules/create';

async function mongodbHandler(crud: string, data: any) {
  const uri = "mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    console.log(`MONGODB SUCCESSFULLY CONNECTED!`);

    switch (crud) {
      case "c":
        createUser(client, data as User);
        return;
      case "r":
        return;
      case "u":
        return;
      case "d":
        return;
      default:
        throw new Error("NO SUCH CRUD SELECTOR!!");
    }
  }
  catch (error) {
    console.log((error as any).message);
  }
  finally {
    await client.close();
  }
}

const PORT = 9001;

const app = express();

app.use(express.json());


app.listen(PORT, async () => {
  await mongodbHandler("c", {
    username: "any",
    useremail: "any@gmail.com",
    usermobile: "01012345678",
    userpassword: "asd;klfjvz"
  } as User)
});
*/