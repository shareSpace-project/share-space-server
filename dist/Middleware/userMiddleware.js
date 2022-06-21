"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNickNameMiddleware = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const updateNickNameMiddleware = (req, res, next) => {
    userModel_1.default.findOne({ nickName: req.body.nickName }).then((userItem) => {
        if (userItem) {
            return res.status(400).json({ success: false, message: '이미 사용하고 있는 아이디입니다.' });
        }
        next();
    });
};
exports.updateNickNameMiddleware = updateNickNameMiddleware;
