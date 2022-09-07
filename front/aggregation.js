const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://JD01:atlas_2022@cluster0.xaqc7ry.mongodb.net/?retryWrites=true&w=majority";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Print the 10 cheapest suburbs in the Sydney, Australia market
        await printCheapestSuburbs(client, "Australia", "Sydney", 10);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the cheapest suburbs for a given market
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} country The country for the given market
 * @param {String} market The market you want to search
 * @param {number} maxNumberToPrint The maximum number of suburbs to print
 */
async function printCheapestSuburbs(client, country, market, maxNumberToPrint) {
    const pipeline = [
        {
            '$match': {
                'bedrooms': 1,
                'address.country': country,
                'address.market': market,
                'address.suburb': {
                    '$exists': 1,
                    '$ne': ''
                },
                'room_type': 'Entire home/apt'
            }
        }, {
            '$group': {
                '_id': '$address.suburb',
                'averagePrice': {
                    '$avg': '$price'
                }
            }
        }, {
            '$sort': {
                'averagePrice': 1
            }
        }, {
            '$limit': maxNumberToPrint
        }
    ];

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
    const aggCursor = client.db("sample_airbnb").collection("listingsAndReviews").aggregate(pipeline);

    await aggCursor.forEach(airbnbListing => {
        console.log(`${airbnbListing._id}: ${airbnbListing.averagePrice}`);
    });
}
main().catch(console.error);

// Add functions that make DB calls here

async function printCheapestSuburbs(client, country, market, maxNumberToPrint) {

    const pipeline = [];
     
const aggCursor = client.db("sample_airbnb")
                        .collection("listingsAndReviews")
                        .aggregate(pipeline);

}


//export

const pipeline = [
    {
      '$match': {
         'bedrooms': 1, 
         'address.country': 'country', 
         'address.market': 'market', 
         'address.suburb': {
           '$exists': 1, 
           '$ne': ''
         }, 
         'room_type': 'Entire home/apt'
        }
     }, {
       '$group': {
          '_id': '$address.suburb', 
          'averagePrice': {
            '$avg': '$price'
          }
        }
     }, {
       '$sort': {
         'averagePrice': 1
        }
     }, {
       '$limit': maxNumberToPrint
     }
  ];

 // Call the Function


  await aggCursor.forEach(airbnbListing => {
    console.log(`${airbnbListing._id}: ${airbnbListing.averagePrice}`);
  });



  //Running aggregation.js results in the following 


  /*
  
Balgowlah: 45.00
Willoughby: 80.00
Marrickville: 94.50
St Peters: 100.00
Redfern: 101.00
Cronulla: 109.00
Bellevue Hill: 109.50
Kingsgrove: 112.00
Coogee: 115.00
Neutral Bay: 119.00
  
  /*
  


  /*

  const agg = [
    {
      '$match': {
        'bedrooms': 1, 
        'address.country': 'Australia', 
        'address.market': 'Sydney', 
        'address.suburb': {
          '$exists': 1, 
          '$ne': ''
        }, 
        'room_type': 'Entire home/apt'
      }
    }, {
      '$group': {
        '_id': '$address.suburb', 
        'averagePrice': {
          '$avg': '$price'
        }
      }
    }, {
      '$sort': {
        'averagePrice': 1
      }
    }, {
      '$limit': 10
    }, {}
  ];
  
  MongoClient.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db('').collection('');
      coll.aggregate(agg, (cmdErr, result) => {
        assert.equal(null, cmdErr);
      });
      client.close();
    });
 
 */


  
 


 