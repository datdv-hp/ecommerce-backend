require('dotenv').config();
require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`exits server express`));
});
