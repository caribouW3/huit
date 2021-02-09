const fs = require('fs');
const Handlebars = require('handlebars');

const source = fs.readFileSync('./main.yml.handlebars').toString();
const template = Handlebars.compile(source);

//const json = JSON.parse(fs.readFileSync('./repo-map.json', 'utf8'));

var data = `{ "specifications": [
  { "title" : "XQuery", "repo" : "w3c/qtspecs", "shortname": "xquery" },
  { "title" : "WebRTC 1.0", "repo" : "w3c/webrtc-pc", "shortname": "webrtc" }
 ]
}`;

json = JSON.parse(data);

for (var i=0; i<json.specifications.length; i++) {
    var file = json.specifications[i].repo.split('/').pop();
    var context = { "spec": json.specifications[i].title, "repo": json.specifications[i].repo, "shortname": json.specifications[i].shortname, "file": file };
    const content = template(context);
    fs.writeFileSync('./.github/workflows/'+file+'.yml', content);
}
 
