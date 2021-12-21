import { MongoClient } from "mongodb";

const uri = "mongodb+srv://briankinsella:PKdj7XcuL2xSQvW@cluster0.s7vay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = MongoClient(uri).db("themorningprojectdb");
const configurations = database.collection("configurations");

const configurationStore = {

  async addConfiguration(configuration) {
    const result = await configurations.insertOne(configuration);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    await client.close();
  },

  async getUserConfigurations(userid) {
    await client.connect();
    const userConfigurations = await configurations.find({userid: userid});
    console.log(`A user document was inserted with the _id: ${result.insertedId}`);
    await client.close();
    return userConfigurations;
  },

  async removeConfiguration(id) {
    await client.connect();
    const result = await configurations.deleteOne(id);
    console.log(`A document was deleted with the _id: ${result.insertedId}`);
    await client.close();
  },

  async getConfiguration(id) {
    await client.connect();
    const configuration = await configurations.findOne({ id: id });
    console.log(`A document was found with the _id: ${result.insertedId}`);
    await client.close();
    return configuration;
  },

  async addConfigSetting(id, setting) {
    await client.connect();
    const result = await configurations.updateOne({id: id}, setting);
    console.log(`A document was updated with the _id: ${result.upsertedId}`);
    await client.close();
  }

}
module.exports = configurationStore

