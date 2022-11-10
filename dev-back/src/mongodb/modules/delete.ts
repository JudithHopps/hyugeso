import { MongoClient } from 'mongodb';
import type { User, Article } from '../types';

export async function deleteUser(userEmail: string) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const result = await client
    .db('huegaesou')
    .collection('users')
    .deleteOne({ user_email: userEmail });

  // [TEST]
  console.log(`Delete Count>>> ${result.deletedCount}`);
}

export async function deleteArticle(articleId: string) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const result = await client
    .db('huegaesou')
    .collection('articles')
    .deleteOne({ article_id: articleId });

  // [TEST]
  console.log(`Delete Count>>> ${result.deletedCount}`);
}