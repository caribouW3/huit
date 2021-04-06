const fetch = require('node-fetch');
const env = require('dotenv').config({path: __dirname + '/.env'});
const { nextTick } = require('process');
 
const accessToken = 'your-GH-token-here';

function getClosedIssues(owner,repo,label){
  return new Promise(function (resolve, reject) {
  var labelq = '';
  if (label !== undefined){ labelq = `, labels:"${label}"` ;}
  const query = `
   query {
    repository(owner:"${owner}", name:"${repo}") {
      issues(states:CLOSED ${labelq}) {
      totalCount
      }
    }
   }`;
  fetch('https://api.github.com/graphql', {
   method: 'POST',
   body: JSON.stringify({query}),
   headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': `application/json`
  } ,
  })
  .then (r => r.text())
  .then(data => { obj = JSON.parse(data); 
        resolve( obj.data.repository.issues.totalCount );
	 // {"data":{"repository":{"issues":{"totalCount":247}}}}
  })
  .catch(error => { console.error(error);
                     reject (error );} )
  }
)}



function getOpenIssues(owner,repo,label){
  return new Promise(function (resolve, reject) {
  var labelq = '';
  if (label !== undefined){ labelq = `, labels:"${label}"`; }  
  const query = `
   query {
    repository(owner:"${owner}", name:"${repo}") {
      issues(states:OPEN ${labelq}) {
        totalCount
       }
    }
   }`;

   fetch('https://api.github.com/graphql', {
   method: 'POST',
   body: JSON.stringify({query}),
   headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': `application/json`
  } ,
  })
  .then (r => r.text())
  .then(data => { obj = JSON.parse(data);
        resolve( obj.data.repository.issues.totalCount );
	 // {"data":{"repository":{"issues":{"totalCount":247}}}}
  })
  .catch( error => { console.error(error);
                     reject (error );} )
  }
)}


// test code
/*
getClosedIssues ('w3c','webrtc-pc')
.then (res => console.log(res))
.then (res => { getOpenIssues ('w3c','webrtc-pc') 
                .then (r => console.log(r)); });
*/


exports.getOpenIssues = getOpenIssues;
exports.getClosedIssues = getClosedIssues;
