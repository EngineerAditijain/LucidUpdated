import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AWS from 'aws-sdk'

dotenv.config();

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
//mongodb+srv://aditijainjnv101:VohGASGdNSgHyIvx@cluster0.u7d3jz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://aditijainjnv101:<password>@cluster0.u7d3jz2.mongodb.net/
const Connection = async () => {

    try {
        AWS.config.update({
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
            region: 'us-east-1'
        });

        // Check if the configuration was successful
        if (AWS.config.credentials && AWS.config.credentials.accessKeyId) {
            console.log("AWS configured successfully");
        } else {
            console.error("AWS configuration failed");
        }
        const conn = await mongoose.connect(`mongodb+srv://aditijainjnv101:VohGASGdNSgHyIvx@cluster0.u7d3jz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log('Error while conecting with the AWS', error.message);

    }
}

export default Connection;