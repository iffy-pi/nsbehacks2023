import json
import os

def search( query, filters ):
    with open(os.path.join(os.path.abspath(os.path.split(__file__)[0]), 'db.json' ), 'r') as file:
        db = json.loads(str(file.read()))

    
    matching_profiles = {}

    query = query.strip().lower()

    # matching styles
    for profile in db:
        # search the profile offerings to see if there are any matches
        matched_offerings = list(filter(
            lambda o: any(  any(q in keyw.lower() for q in query.split(' ')) for keyw in o['keywords']),
            profile['offerings']
        ))

        if len(matched_offerings) > 0:
            matching_profiles[str(profile['id'])] = matched_offerings

    # parse offerings into results
    results = []
    stylistinfo = {}

    for stylistid in matching_profiles.keys():
        for offering in matching_profiles[stylistid]:
            # for each offering geneerate the result info
            # and also populate result ids
            results.append({
                'name': offering['name'],
                'price': offering['price'],
                'stylistid':  stylistid
            })

        # append to stylist information
        stylistinfo[str(stylistid)] = {
            'name': db[int(stylistid)]['stylist_name'],
            'location': db[int(stylistid)]['location'],
            'contacts': db[int(stylistid)]['stylist_contacts'],
            'policies': db[int(stylistid)]['policies']
        }

    return {
        'offerings': results,
        'stylistinfo': stylistinfo
    }

    

