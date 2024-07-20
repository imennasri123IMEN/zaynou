const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Invoice = require('../models/Invoice');
const User = require('../models/User');

router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { type, remarks } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const subscription = new Subscription({
      type,
      user: userId,
      remarks,
      endDate: new Date(Date.now() + 30*24*60*60*1000) // Abonnement de 30 jours
    });

    await subscription.save();

    const invoice = new Invoice({
      user: userId,
      subscription: subscription._id,
      amount: type === 'basique' ? 10 : type === 'premium' ? 20 : 30,
      dueDate: new Date(Date.now() + 7*24*60*60*1000) // Facture due dans 7 jours
    });

    await invoice.save();

    res.status(201).json({ subscription, invoice });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer les abonnements d'un utilisateur
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptions = await Subscription.find({ user: userId });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId/invoices', async (req, res) => {
  const { userId } = req.params;

  try {
    const invoices = await Invoice.find({ user: userId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
