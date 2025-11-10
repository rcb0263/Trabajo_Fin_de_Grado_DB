import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

let client: MongoClient;
let dB: Db;
const dbName= "TFG"
export const connectMongoDB = async (): Promise<void> =>{
    try {
        client= new MongoClient(`mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.a4nz0xh.mongodb.net/?appName=${process.env.MONGO_APP_NAME}`);
        await client.connect();
        dB= client.db(dbName)
        console.log("Connected to mongodb at db "+ dbName)

    } catch (error) {
        console.log("Error Mongo: ", error)
    }
}


export const getDb= ():Db => dB;