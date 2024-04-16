import mongoose from "mongoose";

const uidGenerator = () => {
    const time = Date.now();
    const uid = `UID${time}`; 
    return uid;
};

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        default: uidGenerator
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    profile_pic: {
        type: String,
    },
});

const User = mongoose.model('user', UserSchema); 

export default User;
