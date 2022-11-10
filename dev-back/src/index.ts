import express from 'express';
import cors from 'cors';
import { router as routerAuth } from './router/route.auth';
import { router as routerArticle } from './router/route.article';
import { router as routerBoard } from './router/route.board';

const app = express();

// specific cors area
/*
const allowlist = ['http://localhost:5173', 'http://localhost:5000'];

const corsOptions = {
  origin: function (origin: any, callback: Function) {
    if (allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS NOT ALLOWED!'));
    }
  },
};

app.use(cors(corsOptions));
*/

// middleware area
app.use(cors());
app.use(express.json({ limit: 5000000 }));
app.use(routerAuth, routerArticle, routerBoard);

// port listening area
app.listen(5000, () => {
  console.log(`Server Listening on port 5000`);
});
