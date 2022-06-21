import { NextFunction, Request, Response } from 'express';
import User from '../Model/userModel';

export const updateNickNameMiddleware = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ nickName: req.body.nickName }).then((userItem) => {
    if (userItem) {
      return res.status(400).json({ success: false, message: '이미 사용하고 있는 아이디입니다.' });
    }
    next();
  });
};
