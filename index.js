const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/get-vm-content', (req, res) => { 
  fs.readFile('./vm.txt', 'utf-8', (err, data) => { //GET 요청이 들어오면 vm.txt 파일을 읽어서 응답으로 보내줌
    if (err) {
      console.error('Error:', err);
      res.status(500).send('Error occurred while reading the file.');
    } else {
      res.send(data);
    }
  });
});

// Endpoint to handle the GET request and display response from the backend server
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

// Serve the static files (doge.jpg and index.html)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  const html = `<h1>${headerContent}</h1>
    <button onclick="sendGetRequest()">Send GET Request</button>
    <button onclick="refreshPage()">Refresh Page</button>
    <button onclick="getVMContent()">Get VM Content</button>`;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});

app.use(express.json()); //express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const authURL = 'http://10.0.0.53:8080/auth/signin';

  // Make the HTTP POST request to the auth server
  request.post({
    url: authURL,
    json: { email, password }
  }, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Error occurred while communicating with the auth server.');
    } else if (response.statusCode !== 200) {
      console.error('Error:', response.statusCode, body);
      res.status(500).send('Unexpected response from the auth server.');
    } else {
      const responseString = JSON.stringify(body, null, 2);
      res.send(responseString);
    }
  });
});

