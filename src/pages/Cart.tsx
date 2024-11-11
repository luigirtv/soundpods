import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, Package, Shield, Truck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const PRODUCT_PRICE = 25.90;
const SHIPPING_COST = 4.90;
const PROMO_CODE = 'SOUND70';
const DISCOUNT_PERCENT = 70;

const stripePromise = loadStripe('pk_live_51QFbhiFEUgiOpCj7k1o1bIerNqHeGH3GUC1uIB9jE6wRYa9Bui1UPZwiemm0aZ7EbvnavpXJG3qbHQLE9vsslOyF00TDCLJx6z');

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * PRODUCT_PRICE, 0);
  const discount = promoApplied ? (subtotal * DISCOUNT_PERCENT / 100) : 0;
  const total = subtotal - discount + (cartItems.length > 0 ? SHIPPING_COST : 0);

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Code promo invalide');
      setPromoApplied(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      setCheckoutError('');

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Le service de paiement n\'est pas disponible pour le moment');
      }

      const response = await fetch('https://soundpods-api.onrender.com/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          promoApplied
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue lors de la création de la session');
      }

      const { id: sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message || 'Erreur lors de la redirection vers le paiement');
      }
    } catch (error) {
      if (error instanceof Error) {
        setCheckoutError(error.message);
      } else {
        setCheckoutError('Une erreur inattendue est survenue');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8">Découvrez nos produits et commencez votre shopping</p>
          <a
            href="/product"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Voir les produits
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b border-gray-200 py-4"
            >
              <img
                src="https://raw.githubusercontent.com/luigirtv/mes-images/main/61TQDI3XvyL._AC_SL1500_.png"
                alt="SoundPods Pro"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">
                  SoundPods Pro
                </h3>
                <p className="text-gray-600">Écouteurs sans fil</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    disabled={isProcessing}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    disabled={isProcessing}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {(PRODUCT_PRICE * item.quantity).toFixed(2)} €
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 mt-2"
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Résumé de la commande
          </h2>

          <div className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Code promo"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isProcessing}
              />
              <button
                onClick={handlePromoCode}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                disabled={isProcessing}
              >
                Appliquer
              </button>
            </div>
            {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
            {promoApplied && (
              <p className="text-green-500 text-sm mt-1">Code promo appliqué !</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Réduction (70%)</span>
                <span>-{discount.toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Frais de port</span>
              <span>{SHIPPING_COST.toFixed(2)} €</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            {checkoutError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {checkoutError}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Traitement en cours...' : 'Procéder au paiement'}
            </button>

            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Paiement 100% sécurisé</p>
              <div className="flex justify-center items-center space-x-2 mt-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Protection SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}