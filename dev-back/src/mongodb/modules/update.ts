import { MongoClient } from 'mongodb';
import type { User, Article } from '../types';

export async function updateUser(user: User) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const updatedInfo = await client
    .db('huegaesou')
    .collection('users')
    .updateOne(
      { user_email: user.user_email },
      { $set: user }
    );

  // [TEST]
  console.log(`The number of matched>>> ${updatedInfo.matchedCount}`);
  // [TEST]
  console.log(`The number of updated>>> ${updatedInfo.modifiedCount}`);
}

export async function updateArticle(article: Article) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const updatedInfo = await client
    .db('huegaesou')
    .collection('articles')
    .updateOne(
      { article_id: article.article_id },
      { $set: article }
    );

  // [TEST]
  console.log(`The number of matched>>> ${updatedInfo.matchedCount}`);
  // [TEST]
  console.log(`The number of updated>>> ${updatedInfo.modifiedCount}`);
}