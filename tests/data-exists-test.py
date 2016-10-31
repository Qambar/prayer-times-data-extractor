import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('prayer-times')

response = table.get_item(
    Key={
        'city-date': 'birmingham-2016-10-01'
    }
)

item = response['Item']
print(item)