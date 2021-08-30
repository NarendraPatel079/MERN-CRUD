const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [
                true,
                'Please enter name.'
            ]
        },
        username: {
            type: String,
            trim: true,
            required: [
                true,
                'Please enter user name.'
            ]
        },
        email: {
            type: String,
            trim: true,
            required: [
                true,
                'Please enter email address.'
            ],
            validate: {
                validator: function(v) {
                  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `"${props.value}" is not a valid email address!`
            },
        },
        password: {
            type: String,
            minLength: [8, 'Minimum length of the password is 8'],
            required: [
                true,
                'Please enter password.'
            ]
        },
        phone: {
            type: Number,
            trim: true,
            required: [
                false,
                'Please enter contact number.'
            ]
        }
    }
);

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'users');
const user = mongoose.model('users', userSchema);
module.exports = user;