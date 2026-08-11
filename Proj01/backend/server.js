const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./src/config/db');
const app = require('./src/app');

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `[Server Running]: Server started in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection Error]: ${err.message}`);
  server.close(() => process.exit(1));
});
