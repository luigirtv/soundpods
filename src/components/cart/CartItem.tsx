import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  id: string;
  quantity: number;
  price: number;
  isProcessing: boolean;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  id,
  quantity,
  price,
  isProcessing,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 border-b border-gray-200 py-4">
      <img
        src="https://raw.githubusercontent.com/luigirtv/mes-images/main/61TQDI3XvyL._AC_SL1500_.png"
        alt="SoundPods Pro"
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">SoundPods Pro</h3>
        <p className="text-gray-600">Écouteurs sans fil</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={isProcessing}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="mx-2 w-8 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={isProcessing}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          {(price * quantity).toFixed(2)} €
        </p>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-500 mt-2"
          disabled={isProcessing}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}