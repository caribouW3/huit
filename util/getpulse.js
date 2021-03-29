const fetch = require('node-fetch');
 
const accessToken = 'yourtokenhere';

function getClosedIssues(owner,repo){
  return new Promise(function (resolve, reject) {
  const query = `
   query {
    repository(owner:"${owner}", name:"${repo}") {
      issues(states:CLOSED) {
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



function getOpenIssues(owner,repo){
  return new Promise(function (resolve, reject) {

  const query = `
   query {
    repository(owner:"${owner}", name:"${repo}") {
      issues(states:OPEN) {
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


/*test code
getClosedIssues ('w3c','webrtc-pc')
.then (res => console.log(res))
.then (res => { getOpenIssues ('w3c','webrtc-pc') 
                .then (r => console.log(r)); });
*/


exports.getOpenIssues = getOpenIssues;
exports.getClosedIssues = getClosedIssues;
