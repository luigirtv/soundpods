// Importez Express
const express = require('express');
const app = express();

// Ajoutez un middleware pour gérer les requêtes JSON
app.use(express.json());

// Définissez la route de santé
app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

// Démarrez le serveur et écoutez sur le port défini
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

