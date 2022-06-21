import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Mongoose from 'mongoose';
import { Server } from 'socket.io';
import userRouter from './Router/userRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

Mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    const server = app.listen(port);
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    });
    console.log('mongoDB connect!!');
    io.on('connection', (socket) => {
      socket.emit('test', { message: 'hello!' });
      console.log('연결되었습니다.!');
    });
  })
  .catch((error) => console.log(error));

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/users', userRouter);

app.use(express.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음

app.get('/', (req, res) => {
  return res.status(200).json({ message: '서버연결!' });
});

// app.get('*', (req, res) => {
//   res.status(404).json({ message: '찾을 수 없는 페이지입니다!' });
// });
