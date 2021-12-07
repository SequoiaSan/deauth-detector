from globalVars import dbAttacks, dbLookups

mock_data = {
    'deauthAttacks': [
        {
            'timestamp': '1574455535',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                'oui': '12:34:56',
                'company_name': 'Comcast',
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574455535',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574455535',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574455535',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574455535',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574469119',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574469119',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        },
        {
            'timestamp': '1574469119',
            'type': 'deauth',
            'victim': '00:14:22:01:23:45',
            'router': '00:99:99:00:99:00',
            'routerInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            },
            'victimInfo': {
                "oui": "12:34:56",
                'company_name': "Comcast",
                "company_address": "123 Main Street",
                "country_code": "US"
            }
        }
    ]
}

# Method to drop the deauth_attacks MongoDB database
def reset_db():
    print('Clearing database...')
    dbAttacks.truncate()
    dbLookups.truncate()


# Method to populate the deauth_attacks MongoDB database with mock data
def populate_db_with_mock_data():
    print('Populating database with mock data...')

    try:
        dbAttacks.insert_multiple(data)
    except:
      print('ERROR: Failed to load mock data into the database. Message Cameron Cooper to fix it')
