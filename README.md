# HOW TO MAKE UPDATES TO THE RECOMMENDATIONS DATA?

Please submit an issue using the issue template in this repository

(or feel free to submit a PR to update the recs.json file if you regularly consume json data for breakfast)

Thanks!


# explored (historical dev notes)

- https://github.com/w3c/spec-dashboard/blob/gh-pages/repo-map.json is missing most of the data since it only works where there is an associated group (which won't exist for post-REC in most cases)

- dashboard proposal: https://github.com/ethomson/issue-dashboard using GH actions

- config generation using handlebars works (GH actiions workflow generated from a template + JSON data on REC repos)

# current status

- defines an alternate map for RECs only

    * generate a JSON from W3C API, with additional info on specs developed in repo
    * fill in the gaps

- generates a report (script to be run manually)
    
- possibly: use the publication webhooks to keep it up to date
