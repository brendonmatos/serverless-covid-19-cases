const data = require('../../data.json')
const db = require('../db/cases')

const client = db.client()
data.map( async item => {

    const point = await client.putPoint({
        RangeKeyValue: { S: (new Date()).toISOString() },
        GeoPoint: {
            latitude: item.lat,
            longitude: item.lon
        },
        PutItemInput: {
            Item: {
                status: { S: item.score }
            }
        }
    }).promise()

} )