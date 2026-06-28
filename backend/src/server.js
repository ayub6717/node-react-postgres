// Simple HTTP Server that renders an HTML page in the browser

const http = require('http');

const PORT = process.env.PORT || 3001;

// Create the HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Node.js Backend</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 500px;
        }
        h1 {
          color: #667eea;
          margin-bottom: 20px;
        }
        .info {
          background: #f0f4ff;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        }
        .badge {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          margin: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎉 Node.js Backend Server</h1>
        <div class="info">
          <p><strong>This is a Node.js HTTP Server</strong></p>
          <p>Request URL: <code>${req.url}</code></p>
          <p>Request Method: <code>${req.method}</code></p>
          <p>Server Time: <code>${new Date().toLocaleString('en-US')}</code></p>
        </div>
        <div class="badge">✅ Server Running</div>
        <div class="badge">Node ${process.version}</div>
        <p style="margin-top: 20px; color: #666;">
          The backend output is rendered directly in the browser! 🚀
        </p>
      </div>
    </body>
    </html>
  `;

  res.end(html);
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  console.log(`Open the link above in your browser! 👆`);
});
