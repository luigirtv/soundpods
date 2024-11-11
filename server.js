// Importez Express en utilisant ESM
import express from 'express';

const app = express();

// Ajoutez un middleware pour gérer les requêtes JSON
app.use(express.json());

// Définissez la route de santé
app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

// Démarrez le serveur et écoutez sur le port défini
const PORT = process.env.PORT || 3000;import bodyParser from 'body-parser';
import Stripe from 'stripe';

const stripe = new Stripe('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', { apiVersion: '2022-11-15' });

// Middleware pour analyser les données brutes du webhook
app.use(bodyParser.raw({ type: 'application/json' }));

// Point de terminaison pour gérer les webhooks Stripe
app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Vérifiez la signature du webhook
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_UZIi38NN969ZIlsZXGm2rR7cvgLsc1Ua');
  } catch (err) {
    console.error(`⚠️ Erreur de vérification du webhook : ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer les événements Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Paiement réussi pour :', paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      console.log('Échec de paiement pour :', failedIntent);
      break;
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Session de paiement terminée :', session);
      break;
    default:
      console.log(`Événement non géré : ${event.type}`);
  }

  // Réponse 200 OK à Stripe
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

