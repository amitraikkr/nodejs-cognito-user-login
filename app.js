const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const { jwtDecode } = require('jwt-decode');

const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const poolData = {    
    UserPoolId : process.env.COGNITO_USER_POOL_ID,
    ClientId : process.env.COGNITO_CLIENT_ID
}; 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html'); // Provide a login form
});

app.post('/login', (req, res) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : req.body.username,
        Password : req.body.password,
    });

    var userData = {
        Username : req.body.username,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            try{
                var accessToken = result.getAccessToken().getJwtToken();
                var idToken = result.getIdToken().getJwtToken();

                var decodedToken = jwtDecode(idToken);
                //console.log(decodeToken)

                // Check the user groups
                if (decodedToken['cognito:groups'] && decodedToken['cognito:groups'].includes('Admins')) {
                    res.send('Admin Logged In');
                } else if (decodedToken['cognito:groups'] && decodedToken['cognito:groups'].includes('devusers')) {
                    res.send('Dev User Logged In');
                } else {
                    res.send('User Logged In');
                }
            
                // Use the access token to access resources or display it
                //res.send(`Decoded Token: ${decodeToken} - Id Token: ${idToken}`);
            }catch (error) {
                console.error('Error decoding token:', error);
                res.status(500).send('Error processing your request.');
            }
        },
        onFailure: function(err) {
            res.status(400).send(err.message || JSON.stringify(err));
        },
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
