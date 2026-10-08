const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const app = express();

const unblocker = new Unblocker({ prefix: '/proxy/' });
app.use(unblocker);

// This cleanly loads your separate index.html file from above!
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Nexus server dashboard online on port ${PORT}`);
}).on('upgrade', unblocker.onUpgrade);
