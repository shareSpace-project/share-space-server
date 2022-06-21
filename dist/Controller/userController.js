"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateProfile = exports.updateNickName = exports.myUser = exports.deleteUser = exports.login = exports.signup = exports.signupIdCheck = exports.signNicknameCheck = exports.allUser = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const allUser = (req, res) => {
    userModel_1.default.find()
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, user: item });
    })
        .catch((err) => {
        res.status(500).json({ success: false, message: 'server Error' });
    });
};
exports.allUser = allUser;
const signNicknameCheck = (req, res) => {
    userModel_1.default.findOne({ nickname: req.body.nickname })
        .exec()
        .then((item) => {
        console.log(item);
        if (item) {
            return res.status(400).json({ success: false, message: '이미 존재하는 닉네임 입니다.' });
        }
        res.status(200).json({ success: true, message: '사용 가능한 닉네임 입니다.' });
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'server Error' });
        console.log(error);
    });
};
exports.signNicknameCheck = signNicknameCheck;
const signupIdCheck = (req, res) => {
    userModel_1.default.findOne({ id: req.body.id })
        .exec()
        .then((item) => {
        if (item) {
            return res.status(400).json({ success: false, message: '이미 존재하는 이메일 입니다.' });
        }
        res.status(200).json({ success: true, message: '사용 가능한 이메일 입니다.' });
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'server Error' });
        console.log(error);
    });
};
exports.signupIdCheck = signupIdCheck;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(req.body.password, 12);
    let temp = {
        id: req.body.id,
        password: hashed,
        nickName: req.body.nickName,
        profile: req.body.profile,
    };
    const userSignup = new userModel_1.default(temp);
    userSignup
        .save()
        .then(() => {
        res.status(200).json({ success: true, user: userSignup });
    })
        .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, message: 'server error' });
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userModel_1.default.findOne({ id: req.body.id })
        .exec()
        .then((item) => {
        console.log(item);
        if (!req.body.password) {
            return res.status(401).json({ success: false, message: '비밀번호를 입력해주세요.' });
        }
        if (!item) {
            return res.status(401).json({ success: false, message: '이메일을 확인해주세요.' });
        }
        if (!item.password) {
            return res.status(401).json({ success: false, message: 'DB에 문제가 있습니다.' });
        }
        bcrypt_1.default.compare(req.body.password, item.password).then(function (result) {
            if (!result) {
                return res.status(401).json({ success: false, message: '비밀번호를 확인해주세요.' });
            }
            res.status(200).json({ success: true, user: item });
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: err });
    });
});
exports.login = login;
const deleteUser = (req, res) => {
    userModel_1.default.findOneAndDelete({ _id: req.body.id })
        .exec()
        .then((item) => {
        if (!item) {
            return res
                .status(400)
                .json({ success: false, message: '가입되어있지 않은 아이디 입니다..' });
        }
        else {
            return res.status(200).json({ success: true, user: item });
        }
    })
        .catch((err) => {
        res.status(400).json({ success: false, message: '탈퇴 실패하였습니다.', err });
    });
};
exports.deleteUser = deleteUser;
const myUser = (req, res) => {
    userModel_1.default.findOne({ _id: req.query.id })
        .exec()
        .then((user) => {
        if (!user) {
            return res.status(400).json({ message: '유저를 찾지 못했습니다.' });
        }
        else {
            return res.status(200).json({ success: true, user });
        }
    })
        .catch((err) => {
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.myUser = myUser;
const updateNickName = (req, res) => {
    userModel_1.default.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            nickName: req.body.nickName,
        },
    }, { new: true })
        .exec()
        .then((user) => {
        if (!user) {
            return res.status(400).json({ success: false, message: '유저를 찾지 못했습니다.' });
        }
        return res.status(200).json({ success: true, user });
    })
        .catch((err) => {
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.updateNickName = updateNickName;
const updateProfile = (req, res) => {
    userModel_1.default.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            profile: req.body.profile,
        },
    }, { new: true })
        .exec()
        .then((user) => {
        if (!user) {
            return res.status(400).json({ message: '유저를 찾지 못했습니다.' });
        }
        else {
            return res.status(200).json({ success: true, user });
        }
    })
        .catch((err) => {
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.updateProfile = updateProfile;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(req.body.password, 12);
    userModel_1.default.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            password: hashed,
        },
    }, { new: true })
        .exec()
        .then((user) => {
        if (!user) {
            return res.status(400).json({ message: '유저를 찾지 못했습니다.' });
        }
        else {
            return res.status(200).json({ success: true, user });
        }
    })
        .catch((err) => {
        res.status(500).json({ success: false, message: 'server error' });
    });
});
exports.updatePassword = updatePassword;
