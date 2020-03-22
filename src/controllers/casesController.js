
const db = require('../db/cases')

class CasesController {
    
    constructor() {
        this.db = db.client()
        this.find = this.find.bind(this)
        this.create = this.create.bind(this)
        return
    }

    _getParams(request) {

        if( request.method === 'GET' ) {
            return request.query
        }

        return request.body
    }

    _getParsedParams(request) {
        const { status, latitude, longitude, radius } = this._getParams(request)

        return {
            status,
            latitude: Number.parseFloat(latitude),
            longitude: Number.parseFloat(longitude),
            radius: Number.parseFloat(radius)
        }
    }

    async find(request, response) {        

        const { status, latitude, longitude, radius } = this._getParsedParams(request)

        const cases = await this.db.queryRadius({
            RadiusInMeter: radius,
            CenterPoint: {
                latitude: latitude,
                longitude: longitude
            }
        })

        response.json({ cases: cases, total: cases.length})
    }

    async create(request, response) {
        const { status, latitude, longitude } = this._getParsedParams(request)
        const point = await this.db.putPoint({
            RangeKeyValue: { S: (new Date()).toISOString() },
            GeoPoint: {
                latitude,
                longitude
            },
            PutItemInput: {
                Item: {
                    status: { S: status }
                }
            }
        }).promise()

        response.json({ point })
    }
}

module.exports = new CasesController()