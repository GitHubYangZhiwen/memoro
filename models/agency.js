const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgencySchema = new Schema({
    belong: {type: Schema.Types.ObjectId, ref: 'Person', required: true},
    type: {type: Schema.Types.ObjectId, ref: 'AgencyClassification'},
    content: {type: String, required: true},
    createtime: {type: Date},
    isimportant: { type: Boolean, default: false },
    isfinish: { type: Boolean, default: false },
    note: {type: String},
    isdelete: { type: Boolean, default: false },
    deletetime: {type: Date}
});

module.exports = mongoose.model('Agency', AgencySchema);