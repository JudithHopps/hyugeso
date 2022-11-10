import { MongoClient } from 'mongodb';

export async function findUser(email: string) {
  const uri = "mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();

	const result = await client
		.db('huegaesou')
		.collection('users')
    .findOne({
      user_email: email
    });

  // [TEST]
  console.log(`Found User's Info>>> ${result}`);

  return result;
};

export async function findAllUsers() {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const result = await client
    .db('huegaesou')
    .collection('users')
    .find({})
    .toArray();

  return result;
};

export async function findArticleByUser(email: string) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const result = await client
    .db('huegaesou')
    .collection('articles')
    .find({
      article_author: email
    });

  // [TEST]
  console.log(`Found Article's Info>>> ${result}`);

  return result;
};

export async function findArticleByArticleId(id: number) {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const result = await client
    .db('huegaesou')
    .collection('articles')
    .findOne({
      article_id: id
    });

  // [TEST]
  console.log(`Found Article's Info>>> ${result}`);

  return result;
};

export async function findAllArticles() {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();

  const result = await client
    .db('huegaesou')
    .collection('articles')
    .find();

  // [TEST]
  console.log(`Found Articles' Info>>> ${result}`);

  return result;
};

export async function findHiwaySvarInfoOnlySvar() {
  const uri = 'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    console.log('client connected successfully!!')

    const huegaesou = "휴게소";

    const result = await client
      .db('huegaesou')
      .collection('hiwaySvarInfo')
      .find({
        svarGsstClssNm: huegaesou
      }).toArray();
    
    console.log(result.length);

    return result;
  }
  catch (err) {
    console.log(err);
  }
};