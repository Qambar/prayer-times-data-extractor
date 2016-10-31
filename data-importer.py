import boto3
import json

def importData(city):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('prayer-times')

    items = getItemsForCity(city)

    for item in items:
        importItem(table, json.loads(item))

def importItem(table, item):
    table.put_item(
       Item=item

    )

def getItemsForCity(city):
    with open('data/' + city + '.json') as f:
        items = f.read().splitlines()
    return items

def importAll():
    # Get the service resource.
    with open('list-of-cities.txt') as f:
        cities = f.read().splitlines()

    for city in cities:
        importData(city)


importAll();