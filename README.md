# plan

- get the data: list of repos and associated Recommendations 

- configurable dashboard

- generate the configurations automatically from the data.

# status

- https://github.com/w3c/spec-dashboard/blob/gh-pages/repo-map.json is missing most of the data since it only works where there is an associated group (which won't exist for post-REC in most cases)

- dashboard proposal: https://github.com/ethomson/issue-dashboard using GH actions

- config generation using handlebars works (GH actiions workflow generated from a template + JSON data on REC repos)

# what's next ? proposals

- define an alternate repo map for RECs only:

    * generate that map from w3c.json in repos with additional info on specs developed in repo (see example in https://github.com/w3c/webrtc-pc/blob/main/w3c.json
the shortname of the spec gives this information)

    * OR start with generating (somewhat manually) the JSON of current repo/RECs data and use the publication webhooks to keep it up to date

- Automate the GH Actions runs without hitting the API limits
