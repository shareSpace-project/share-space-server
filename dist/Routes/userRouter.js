"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../Controller/userController");
const express_1 = __importDefault(require("express"));
const userController_2 = require("../Controller/userController");
const userMiddleware_1 = require("../Middleware/userMiddleware");
const router = express_1.default.Router();
// 가입되어있는 유저 모두 조회
router.get('/', userController_1.allUser);
// 닉네임 중복체크
router.post('/signup/nickNameCheck', userController_2.signNickNameCheck);
// 아이디 중복검사
router.post('/signup/emailCheck', userController_2.signupEmailCheck);
// 회원가입
router.post('/signup', userController_2.signup);
// 로그인
router.post('/login', userController_2.login);
// 회원탈퇴
router.post('/delete', userController_2.deleteUser);
// 내 유저 정보 불러오기
router.get('/my', userController_1.myUser);
// 닉네임 변경
router.put('/update/nickname', userMiddleware_1.updateNickNameMiddleware, userController_1.updateNickName);
// 프로필 변경
router.put('/update/profile', userController_1.updateProfile);
// 패스워드 변경
router.put('/update/password', userController_1.updatePassword);
exports.default = router;
