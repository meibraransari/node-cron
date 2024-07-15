const express = require('express');
const cron = require('node-cron');
const morgan = require('morgan');

// Define Port
const PORT = 4000; // Port number defined at the top

const app = express();

// Custom token to include IP address in morgan logging
morgan.token('remote-addr', function(req, res) {
  return req.ip;
});

// Middleware to log HTTP requests including IP address
app.use(morgan(':remote-addr - :method :url :status :res[content-length] - :response-time ms'));

// Define a cron job
cron.schedule('* * * * *', () => {
  console.log('Cron job running at', new Date());
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
