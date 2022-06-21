import { NextFunction, Request, Response } from 'express';
import User from '../Model/userModel';

export const updateNicknameMiddleware = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ nickname: req.body.nickname }).then((userItem) => {
    if (userItem) {
      return res.status(400).json({ success: false, message: '이미 사용하고 있는 아이디입니다.' });
    }
    next();
  });
};
