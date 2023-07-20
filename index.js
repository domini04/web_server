const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();
const port = 3000;

// Read the contents from ~/vm.txt for the header
const headerContent = fs.readFileSync('vm.txt', 'utf-8');

// Endpoint to handle the GET request and display response
app.get('/get-users', (req, res) => {
  const backendURL = 'http://10.0.0.53:8080/users';

  // Make the HTTP GET request to the backend server
  request.get(backendURL, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Error occurred while communicating with the backend server.');
    } else if (response.statusCode !== 200) {
      console.error('Error:', response.statusCode, body);
      res.status(500).send('Unexpected response from the backend server.');
    } else {
      const responseData = JSON.parse(body);
      const responseString = JSON.stringify(responseData, null, 2);
      const htmlResponse = `<h2>Response from Backend:</h2><pre>${responseString}</pre>`;
      res.send(htmlResponse);
    }
  });
});

// Serve the header content and the static files (doge.jpg and index.html)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  const html = `<h1>${headerContent}</h1><button onclick="sendGetRequest()">Send GET Request</button><button onclick="refreshPage()">Refresh Page</button>`;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});