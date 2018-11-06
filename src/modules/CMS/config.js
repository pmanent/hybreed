const currentEnviroment='INT';

const currentVersion='0.0.1';

const currentDate='18/10/2018';

const endpoints = {
  dev: 'https://api.socialbakers.com',
  prod: 'https://api.socialbakers.com',

  getEndpoint: function() {
    if(currentEnviroment === 'DEV'){
      return this.dev
    }
    else if(currentEnviroment === 'PRO') {
      return this.prod
    }
    else {
      return this.prod
    }
  }
}

const defaultCredentials = {
    username:'MzQxMzc1XzE0OTYyOTBfMTg0NTQ2MDY1MjA4N182ZjBhNWJlZjZiMTMxOWFjZTVjMGQ3ZjBiNWY0NGI4Yg==',
    password:'bb9eb8a1f0dbdfba8a8b0e6b39f9f16c'
}

let loggedUserCredentials = undefined;

function getCredentials(){
    var credential=defaultCredentials;
    if(loggedUserCredentials){
        credential = loggedUserCredentials;
    }
    return credential;
}

function setCredentials(credentials){
    loggedUserCredentials = credentials;
};

function getCurrentEnvironment(){
    return currentEnviroment;
}

function getCurrentVersion(){
    return currentVersion;
}

function getCurrentDate(){
    return currentDate;
}

function getDefaultCredentials(){
    return defaultCredentials;
}



// API definition
const API = {
  endpoints,
  currentEnviroment,
  getCredentials,
  setCredentials,
  getCurrentEnvironment,
  getCurrentVersion,
  getCurrentDate,
  getDefaultCredentials
}
export default API
