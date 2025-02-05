const mongoose = require('mongoose');
const brycpt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'passenger',
        enum: ['passenger', 'driver'],
        // required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await brycpt.hash(user.password, 10);
    }
    next();
});


// statics
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({email:email});
    return user;
  };

// methods
userSchema.methods.comparePassword = async function (password) {
    return await brycpt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = {
    User
}
