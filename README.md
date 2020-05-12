# MDBW20
__Atlas Datalake IOT demo environment__

---
## Description

Contains all the sources to reproduce the Demo coming along with the MongoDB Live 2020 presentation 
---
## Setup Atlas
* Create an Atlas account (a free account is ok) and an Atlas cluster (a free tier cluster is ok too) : http://cloud.mongodb.com
* Create a new Atlas Data Lake (click Data Lake in the left pane in Atlas, then "Try MongoDB Atlas Datalake", and follow instructions 
* Add your IP address to Atlas Whitelist (Security, Network Access)
* Create a database user/password (Security Database Access)
* once your Atlas Cluster is created and Data Lake is created, collect the connection strings:
- click "connect" on your _cluster_, "connect with your application" and select "Node.JS 3.0 or later" --> copy the connection string
- click "connect" on your _data lake_, "connect with your application" and select "Node.JS 3.0 or later" --> copy the connection string

connection strings should look like this : 
- "mongodb+srv://user:password@replicasetFQDN/test" for the cluster
- "mongodb://user:password@replicasetFQDN/test" for Data Lake

## Setup AWS S3


TODO
