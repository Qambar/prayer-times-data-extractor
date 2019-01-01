This extracts data from najaf.org and uploads it to dynmodb on the configured aws account.

# Install

```
pip3 install boto3
npm install && mkdir data
node data-extractor.js
```

# Usage
```
aws configure 
# configure your aws credentials than import data into database.

python data-importer.py
```
