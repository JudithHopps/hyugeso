import { MongoClient } from 'mongodb';
import type { User, Article, Board } from '../types';

export async function createUser(user: User) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const newbie = await client
    .db('huegaesou')
    .collection('users')
    .insertOne(user);

  // [TEST]
  console.log(`New User Created>>> ${newbie.insertedId}`);

  // [TEST] console.log(`newbie>>> ${newbie}`);
  return newbie;
}

export async function createPost(article: Article) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const newPost = await client
    .db('huegaesou')
    .collection('articles')
    .insertOne(article);

  // [TEST]
  console.log(`New Article Created>>> ${newPost.insertedId}`);

  // [TEST] console.log(`newPost>>> ${newPost}`);
  return newPost;
}

export async function createBoard(board: Board) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const newBoard = await client
    .db('huegaesou')
    .collection('boards')
    .insertOne(board);
  
  // [TEST]
  console.log(`New Board Created>>> ${newBoard.insertedId}`);

  // [TEST] console.log(`newBoard>>> ${newBoard}`);
  return newBoard;
}