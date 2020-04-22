const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgencyClassificationSchema = new Schema({
    belong: {type: Schema.Types.ObjectId, ref: 'Person', required: true},
    label: {type: String, required: true},
    color: {type: String, required: true}
});

module.exports = mongoose.model('AgencyClassification', AgencyClassificationSchema);