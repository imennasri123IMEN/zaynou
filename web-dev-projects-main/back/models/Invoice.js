const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const invoiceSchema = new Schema({
  invoiceId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  status: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
