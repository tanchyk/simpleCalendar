import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    start: {type: Number, required: true},
    duration: {type: Number, required: true},
    title: {type: String, required: true, unique: true},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Event', schema)