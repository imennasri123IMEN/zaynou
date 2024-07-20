const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Invoice = require('../models/Invoice');

router.get('/subscriptions-count', async (req, res) => {
  try {
    const subscriptionsCount = await Subscription.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(subscriptionsCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/invoices-total-amount', async (req, res) => {
  try {
    const totalAmount = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    res.json(totalAmount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user-invoices-total-amount', async (req, res) => {
  try {
    const totalAmountPerUser = await Invoice.aggregate([
      {
        $group: {
          _id: '$user',
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          user: '$user.name',
          totalAmount: 1
        }
      }
    ]);

    res.json(totalAmountPerUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/unpaid-invoices-count', async (req, res) => {
  try {
    const unpaidInvoicesCount = await Invoice.countDocuments({ status: 'unpaid' });
    res.json({ unpaidInvoicesCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
