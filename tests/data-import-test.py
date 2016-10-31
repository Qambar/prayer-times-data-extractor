import boto3

def importItem(table, item):
    table.put_item(
       Item=item

    )

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('prayer-times')

item = {'city-date':'birmingham-2016-10-01','imsaak':'2016-10-01T04:44:00.000Z','dawn':'2016-10-01T04:54:00.000Z','sunrise':'2016-10-01T06:08:00.000Z','noon':'2016-10-01T11:57:00.000Z','sunset':'2016-10-01T17:46:00.000Z','maghrib':'2016-10-01T18:06:00.000Z'}
importItem(table, item)