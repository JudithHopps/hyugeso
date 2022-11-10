// 초기 Database 설정을 위한 파일
import { MongoClient } from 'mongodb';
import type { HiwaySvarInfo } from './types';
import { hiwaySvarInfoArray } from './data/hiwaySvarInfoList';

async function createHiwaySvarInfo(hiwaySvarInfo: HiwaySvarInfo[]) {
  const uri =
    'mongodb+srv://seongjun:Y86JZY6SjEgKqb5V@communitycluster.wdtln5q.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const hiwaySvarInfos = await client
      .db('huegaesou')
      .collection('hiwaySvarInfo')
      .insertMany(hiwaySvarInfo);

    console.log(`HiwaySvarInfo Created!`);
    console.log(`Inserted Count>>> ${hiwaySvarInfos.insertedCount}`);

    return hiwaySvarInfos;
  } catch (err) {
    console.log(`ERROR!>> ${err}`);
  }
}

createHiwaySvarInfo(hiwaySvarInfoArray);
