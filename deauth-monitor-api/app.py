import sys
from flask import Flask, jsonify
from bson.json_util import dumps
from flask_cors import CORS
from pymongo import MongoClient
from db_utils import reset_db, populate_db_with_mock_data

app = Flask(__name__)

# Allow all origins
CORS(app, resources={r'*': {'origins': '*'}})

# MongoDB Setup
client = MongoClient('mongodb://localhost:27017')
db = client['deauth_attacks']
attacksCollection = db.attacks

@app.route('/attacks')
def index():
    try:
        deauthAttacks = list(attacksCollection.find())

        if len(deauthAttacks) > 0:
            response = {
                "lastAttack": deauthAttacks[len(deauthAttacks) - 1],
                "deauthAttacks": deauthAttacks
            }
            return dumps(response)
        else:
            return 'No DB entries', 404
    except:
        return 'Failed to process query', 500

@app.route('/cleardb')
def cleardb():
    try:
        reset_db()
        return 'Database cleared'
    except:
        return 'Failed to process query', 500    


if __name__ == '__main__':
    if sys.argv[1] == 'mock_data':
        reset_db()
        populate_db_with_mock_data()

    if sys.argv[1] == 'reset_db':
        reset_db()

    app.run(host='0.0.0.0')
