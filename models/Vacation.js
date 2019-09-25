const mongoose = require('mongoose');

const VacationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    dateStart: {
        type: String
    },
    dateEnd: {
        type: String
    },
    days: {
        type: Number
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('vacation', VacationSchema);
