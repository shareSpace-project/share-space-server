"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    id: String,
    password: String,
    nickname: String,
    date: String,
}, {
    timestamps: true,
    collection: 'users',
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
