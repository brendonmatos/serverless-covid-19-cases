require('dotenv').config()

const AWS = require('aws-sdk')
const ddbGeo = require('dynamodb-geo')
AWS.config.update({region: process.env.AWS_REGION})

const ddb = new AWS.DynamoDB() 

const config = new ddbGeo.GeoDataManagerConfiguration(ddb, process.env.DATABASE_NAME)
config.hashKeyLength = 5

const setupTable = () => {

    const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(config)

    delete createTableInput.ProvisionedThroughput
    createTableInput.BillingMode = 'PAY_PER_REQUEST'
    console.dir(createTableInput, { depth: null })
    ddb.createTable(createTableInput).promise()
        .then(function () { return ddb.waitFor('tableExists', { TableName: config.tableName }).promise() })
        .then(function () { console.log('Table created and ready!') })
}

module.exports = {
    setup() {
        return setupTable()
    },
    client() {
        const client = new ddbGeo.GeoDataManager(config)
        return client
    },
    ddb() {
        return ddb
    }
}
