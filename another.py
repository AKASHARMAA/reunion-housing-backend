from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://akash76648:QXGqheFCO1yq6bu6@akash.t5noifa.mongodb.net/?retryWrites=true&w=majority')
print(client.list_database_names())
