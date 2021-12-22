const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://briankinsella:PKdj7XcuL2xSQvW@cluster0.s7vay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const configurationStore = {

  async addConfiguration(configuration) {
    const client = new MongoClient(uri);
    const db = client.db("themorningprojectdb");
    const configurations = db.collection("configurations");
    try {
      await client.connect();
      const result = await configurations.insertOne(configuration);
    } finally {
      await client.close();
    }
    console.log('here in ad configuration')
  },

   async getUserConfigurations(userId) {
    const client = new MongoClient(uri);
    const db = client.db("themorningprojectdb");
    const configurations = db.collection("configurations");
    let userConfigurations;
    try {
      await client.connect();
      const cursor = configurations.find({});
      userConfigurations = await cursor.toArray();
    } finally {
      await client.close();
    }
    return userConfigurations;
  },

  async removeConfiguration(id) {
    const client = new MongoClient(uri);
    const db = client.db("themorningprojectdb");
    const configurations = db.collection("configurations");
    try {
      await client.connect();
      await configurations.deleteOne({ id: id} );
    } finally {
      await client.close();
    }
  },

  async getConfiguration(id) {
    const client = new MongoClient(uri);
    const db = client.db("themorningprojectdb");
    const configurations = db.collection("configurations");
    var configuration;
    try {
      await client.connect();
      configuration = await configurations.findOne({ id: id });
    } finally {
      await client.close();
    }
    return configuration
  },

  async addConfigSetting(id, setting) {
    const client = new MongoClient(uri);
    const db = client.db("themorningprojectdb");
    const configurations = db.collection("configurations");
    try {
      await client.connect();
      await configurations.updateOne({id: id}, {$set: {"settings": [setting]}});
    } finally {
      await client.close();
    }
  }

}
module.exports = configurationStore

