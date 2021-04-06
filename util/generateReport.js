const fs = require("fs");
const pulse = require("./getpulse.js");

const data = require(`./recs.json`);

function genSpecRow(spec){
  return new Promise(function (resolve, reject) {
  var nbclosed, nbopen, color ;
  let owner = 'w3c';
  let retired = '';
  if (spec.status === 'Retired'){ 
    retired = "class='retired'";
  }
  defaultcode = `
    <tr ${retired}>
    <td class='title'>${spec.title}</td>
    <td class='latesturi'>${spec.uri}</td>
    <td class='repo'>unknown</td>
    <td class='openissues'></td>
    </tr>`;
  if (spec.repo !== undefined){
    if (spec.owner !== undefined){ owner = spec.owner }
    pulse.getOpenIssues(owner,spec.repo,spec.label) 
    .then ( r => { nbopen = r ; 
                 pulse.getClosedIssues(owner,spec.repo,spec.label)
                .then( r => { nbclosed = r ; 
		              if (nbclosed != 0){
				var col = ((1 - nbopen/(nbopen+nbclosed))*120).toString(10) ;
				color = `hsl(${col},100%,50%);`
                            } else { color = `hsl( 100, 100%, 50%);` }
  code = `
    <tr ${retired}>
    <td class='title'>${spec.title}</td>
    <td class='latesturi'>${spec.uri}</td>
    <td class='repo'>${spec.repo}</td>
    <td class='openissues' style="background-color:${color}">${nbopen} / ${nbclosed}</td>
    </tr>`;
   resolve(code);
		})
	        .catch(	err => { console.log(err); resolve(defaultcode) } );
               })
  .catch( err => {
        console.log(err);
        resolve(defaultcode);
  })
  } else { 
  resolve(defaultcode);
  }
 })
}

async function toHTML(data) {
  var html = `<html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #e6f2ff
        }
        tr:nth-child(even) {
          background: #cce6ff
        }
        tr.retired{
          background: #ccc !important;
        }
     </style>
     <script src="sorttable.js"></script> 
    </head>
    <body>
    <table class="sortable">
      <tr>
      <th>Spec title</th>
      <th>URI of the REC</th>
      <th>repo</th>
      <th>Issues status (open/closed)</th>
      </tr>`;

  for (var i=0; i<data.specifications.length; i++) {
        await genSpecRow(data.specifications[i])
	.then ( row => { html += row ; } )
        .catch (err => console.log(err));
  }
  html += "</table></body></html>";
console.log("done");
  fs.writeFileSync(`./report.html`, html);
}

toHTML(data);

