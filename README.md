# SoundPods API

Backend API for the SoundPods e-commerce site, handling Stripe payment integration.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your environment variables
4. Start the server: `npm start`

## Environment Variables

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
FRONTEND_URL=https://soundpods.netlify.app
```

## Features

- Stripe payment integration
- Apple Pay support
- Secure checkout process
- Promo code handling
- French localization