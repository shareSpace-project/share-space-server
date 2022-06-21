import {
  allUser,
  myUser,
  updateNickName,
  updatePassword,
  updateProfile,
} from '../Controller/userController';
import express from 'express';
import {
  deleteUser,
  login,
  signNicknameCheck,
  signup,
  signupIdCheck,
} from '../Controller/userController';
import { updateNickNameMiddleware } from '../Middleware/userMiddleware';

const router = express.Router();

// 가입되어있는 유저 모두 조회
router.get('/', allUser);
// 닉네임 중복체크
router.post('/signup/nicknameCheck', signNicknameCheck);
// 아이디 중복검사
router.post('/signup/idCheck', signupIdCheck);
// 회원가입
router.post('/signup', signup);
// 로그인
router.post('/login', login);
// 회원탈퇴
router.post('/delete', deleteUser);
// 내 유저 정보 불러오기
router.get('/my', myUser);
// 닉네임 변경
router.put('/update/nickname', updateNickNameMiddleware, updateNickName);
// 프로필 변경
router.put('/update/profile', updateProfile);
// 패스워드 변경
router.put('/update/password', updatePassword);

export default router;
