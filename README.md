# Node.js Cognito Login App

This project is a Node.js application that authenticates users with AWS Cognito. Based on the authenticated user's group or profile, it displays a specific message tailored to the user's role.

## Features

- **User Authentication**: Leverages AWS Cognito to manage user authentication.
- **Dynamic Content Display**: Shows content based on the user's group or profile, as defined in AWS Cognito.


## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: This project requires Node.js to be installed on your machine.
- **AWS Account**: You need to have an AWS account and a Cognito User Pool configured to use this app.
- **Cognito User Pool**: Make sure a Cognito user pool is created, update the config.env file will User Pool Id and Client Id

## Installation

To install the Node.js Cognito Login App, follow these steps:

```bash
git clone https://github.com/yourusername/nodejs-cognito-login-app.git
cd nodejs-cognito-login-app
npm install Express amazon-cognito-identity-js jwt-decode dotenv 

