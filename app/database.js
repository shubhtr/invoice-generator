"use strict";

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', function () {
            console.log("MongoDB event connected");
        });

        mongoose.connection.once('open', function () {
            console.log('Connection to mongodb database is open');
        });

        mongoose.connection.on('disconnected', function () {
            console.log("MongoDB event disconnected");
            //mongoose.connection.removeAllListeners();
        });

        mongoose.connection.on('reconnected', function () {
            console.log('MongoDB event reconnected');
        });

        mongoose.connection.on('error', function (err) {
            console.log('MongoDB event error: ' + err);
        });

        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGOURI, {
            socketTimeoutMS: 60000
        });
        return 'connection to database successfull!';
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;
