"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNicknameMiddleware = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const updateNicknameMiddleware = (req, res, next) => {
    userModel_1.default.findOne({ nickname: req.body.nickname }).then((userItem) => {
        if (userItem) {
            return res.status(400).json({ success: false, message: '이미 사용하고 있는 아이디입니다.' });
        }
        next();
    });
};
exports.updateNicknameMiddleware = updateNicknameMiddleware;
