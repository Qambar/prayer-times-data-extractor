import boto3

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('prayer-times')

with open('filename') as f:
    lines = f.readlines()
