const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  type: {
    type: String,
    enum: ['basique', 'premium', 'diamant'],
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  remarks: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
