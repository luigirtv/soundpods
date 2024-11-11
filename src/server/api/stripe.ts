import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('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', {
  apiVersion: '2023-10-16',
});

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, shipping, discount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'SoundPods Pro',
            description: 'Écouteurs sans fil avec écran tactile',
            images: ['https://raw.githubusercontent.com/luigirtv/mes-images/main/61TQDI3XvyL._AC_SL1500_.png'],
          },
          unit_amount: discount ? Math.round((2590 * 0.3)) : 2590, // Prix avec réduction si applicable
        },
        quantity: item.quantity,
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 490,
              currency: 'eur',
            },
            display_name: 'Livraison standard',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cart`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement' });
  }
});

export default router;