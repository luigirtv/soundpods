import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Battery, Bluetooth, Wifi, Star, Quote } from 'lucide-react';

export default function Home() {
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Professionnelle en télétravail",
      content: "Ces écouteurs sont parfaits pour mes appels vidéo. La réduction de bruit est impressionnante et l'écran tactile facilite vraiment le contrôle.",
      rating: 5
    },
    {
      name: "Thomas Dubois",
      role: "Sportif amateur",
      content: "Je les utilise pendant mes séances de sport. La résistance à l'eau est efficace et le son est excellent. Le meilleur achat de l'année !",
      rating: 5
    },
    {
      name: "Marie Lambert",
      role: "Étudiante",
      content: "Le rapport qualité-prix est imbattable. L'autonomie est excellente et le son est comparable aux marques haut de gamme.",
      rating: 4
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://raw.githubusercontent.com/luigirtv/images/refs/heads/main/51jFBGIqtXL._AC_SL1024.webp"
            alt="Écouteurs sans fil"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            L'excellence audio sans compromis
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Découvrez nos écouteurs sans fil avec écran tactile innovant
          </p>
          <Link
            to="/product"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Découvrir <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
              <p className="text-gray-600">Clients satisfaits</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
              <p className="text-gray-600">Note moyenne</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
              <p className="text-gray-600">Support client</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">30j</div>
              <p className="text-gray-600">Satisfait ou remboursé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Caractéristiques exceptionnelles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <Battery className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Autonomie de 36h</h3>
              <p className="text-gray-600">
                Profitez de votre musique pendant des heures sans interruption
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <Bluetooth className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bluetooth 5.2</h3>
              <p className="text-gray-600">
                Connexion stable et rapide avec tous vos appareils
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <Wifi className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Écran tactile</h3>
              <p className="text-gray-600">
                Contrôlez facilement votre musique du bout des doigts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ce que nos clients disent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                  <Quote className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à vivre une expérience audio unique ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Commandez dès maintenant et profitez de la livraison rapide
          </p>
          <Link
            to="/product"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 transition"
          >
            Commander maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}