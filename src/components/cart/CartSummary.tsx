import React from 'react';
import { Shield } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  promoCode: string;
  promoError: string;
  promoApplied: boolean;
  isProcessing: boolean;
  checkoutError: string;
  onPromoCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApplyPromo: () => void;
  onCheckout: () => void;
}

export default function CartSummary({
  subtotal,
  discount,
  shippingCost,
  total,
  promoCode,
  promoError,
  promoApplied,
  isProcessing,
  checkoutError,
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Résumé de la commande
      </h2>

      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={promoCode}
            onChange={onPromoCodeChange}
            placeholder="Code promo"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            onClick={onApplyPromo}
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
          <span>{shippingCost.toFixed(2)} €</span>
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
          onClick={onCheckout}
          disabled={isProcessing}
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
  );
}