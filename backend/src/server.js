import app from './app.js';
import config from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Mayu Glow Express API Server listening on port ${PORT}`);
});
