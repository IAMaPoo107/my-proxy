const express = require('express');
const Unblocker = require('unblocker');
const app = express();

const unblocker = new Unblocker({ prefix: '/proxy/' });
app.use(unblocker);

// This serves your custom designed homepage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Unblocked Web Space</title>
        <style>
            body {
                background-color: #121212;
                color: #ffffff;
                font-family: 'Segoe UI', sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            h1 {
                font-size: 2.5rem;
                margin-bottom: 10px;
                color: #bb86fc;
            }
            p {
                color: #a0a0a0;
                margin-bottom: 30px;
            }
            .search-box {
                display: flex;
                background: #1e1e1e;
                padding: 5px;
                border-radius: 50px;
                border: 2px solid #333;
            }
            input {
                flex: 1;
                background: transparent;
                border: none;
                padding: 15px 20px;
                color: white;
                font-size: 16px;
                outline: none;
            }
            button {
                background: #bb86fc;
                border: none;
                color: #121212;
                font-weight: bold;
                padding: 0 25px;
                border-radius: 50px;
                cursor: pointer;
                transition: 0.2s;
            }
            button:hover {
                background: #9965db;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Portal</h1>
            <p>Enter any website link below to surf securely and unblocked.</p>
            
            <div class="search-box">
                <input type="text" id="urlInput" placeholder="https://wikipedia.org" />
                <button onclick="goToSite()">Go</button>
            </div>
        </div>

        <script>
            function goToSite() {
                let url = document.getElementById('urlInput').value.trim();
                if (!url) return alert('Please enter a website address!');
                
                // If they forgot to type http:// or https://, add it automatically
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                
                // Send them straight into your proxy filter
                window.location.href = '/proxy/' + url;
            }

            // Let users press the "Enter" key to search
            document.getElementById('urlInput').addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    goToSite();
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Upgrade handler lets the proxy use advanced WebSockets
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy frontend listening on port ${PORT}`);
}).on('upgrade', unblocker.onUpgrade);
