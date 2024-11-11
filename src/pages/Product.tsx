import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, Star, Truck, Shield, Package } from 'lucide-react';

const PRODUCT_ID = 'wireless-earbuds-1';
const PRODUCT_PRICE = 25.90;
const SHIPPING_COST = 4.90;

export default function Product() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(PRODUCT_ID);
    navigate('/cart');
  };

  const specifications = [
    'Bluetooth 5.2 - Connexion stable et rapide',
    'Autonomie totale de 36h avec le boîtier',
    'Écran tactile OLED sur le boîtier',
    'Réduction de bruit active (ANC)',
    'Résistant à l\'eau IPX5',
    'Commandes tactiles intuitives',
    'Compatible iOS et Android',
    'Microphones HD pour appels',
    'Mode transparence',
    'Égaliseur personnalisable'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image principale */}
        <div>
          <img
            src="https://raw.githubusercontent.com/luigirtv/mes-images/main/61TQDI3XvyL._AC_SL1500_.png"
            alt="SoundPods Pro"
            className="w-full rounded-lg shadow-lg mb-8"
          />
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Contenu du pack</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span>2 écouteurs sans fil</span>
              </li>
              <li className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span>Boîtier de charge avec écran tactile</span>
              </li>
              <li className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span>Câble de charge USB-C</span>
              </li>
              <li className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span>3 paires d'embouts (S/M/L)</span>
              </li>
              <li className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span>Manuel d'utilisation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informations produit */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            SoundPods Pro - Écouteurs Sans Fil
          </h1>
          
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-gray-600">(128 avis)</span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">{PRODUCT_PRICE.toFixed(2)} €</span>
            <span className="text-lg text-gray-500 line-through">89.90 €</span>
            <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded">-71%</span>
          </div>

          <div className="prose prose-blue mb-8">
            <p className="text-gray-600">
              Découvrez une expérience audio exceptionnelle avec les SoundPods Pro. 
              Dotés d'un écran tactile OLED innovant et d'une réduction de bruit active, 
              ces écouteurs sans fil allient technologie de pointe et confort optimal.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Spécifications techniques</h3>
            <ul className="space-y-2">
              {specifications.map((spec, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm">
                Livraison : {SHIPPING_COST.toFixed(2)} €
              </span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm">Paiement sécurisé</span>
            </div>
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm">2-4 jours ouvrés</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}