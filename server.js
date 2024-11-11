import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

app.use(cors({
  origin: ['https://soundpods.netlify.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, promoApplied } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Panier vide' });
    }

    const unitAmount = promoApplied ? 777 : 2590;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'apple_pay'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'SoundPods Pro',
            description: 'Écouteurs sans fil avec écran tactile',
            images: ['https://raw.githubusercontent.com/luigirtv/mes-images/main/61TQDI3XvyL._AC_SL1500_.png'],
          },
          unit_amount: unitAmount,
        },
        quantity: items[0].quantity,
      }],
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 490,
            currency: 'eur',
          },
          display_name: 'Livraison standard',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 2 },
            maximum: { unit: 'business_day', value: 4 },
          },
        },
      }],
      mode: 'payment',
      success_url: 'https://soundpods.netlify.app/success',
      cancel_url: 'https://soundpods.netlify.app/cart',
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_creation: 'always',
      locale: 'fr',
      payment_method_options: {
        apple_pay: {
          setup_future_usage: 'off_session'
        }
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ 
      error: 'Une erreur est survenue lors de la création de la session de paiement',
      details: error.message 
    });
  }
});

// Endpoint pour vérifier la disponibilité d'Apple Pay
app.get('/api/apple-pay/verify', async (req, res) => {
  try {
    const domain = 'soundpods.netlify.app';
    await stripe.applePayDomains.create({
      domain_name: domain,
    });
    res.json({ verified: true });
  } catch (error) {
    console.error('Apple Pay verification error:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la vérification Apple Pay',
      details: error.message 
    });
  }
app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 'OK' });
});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
