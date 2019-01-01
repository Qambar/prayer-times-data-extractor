This extracts data from najaf.org and uploads it to dynmodb on the configured aws account.

# Install

```
pip3 install boto3
npm install && mkdir data
```

# Usage
```
# configure your aws credentials than import data into database.
aws configure 

# extract data from najaf.org
node data-extractor.js

# import data into dynamodb
python data-importer.py
```
