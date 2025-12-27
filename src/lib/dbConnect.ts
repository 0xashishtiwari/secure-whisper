import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number;
}

const connection : ConnectionObject = {};

// Function to connect to MongoDB using Mongoose
async function dbConnect():Promise<void> {
    // Check if already connected to avoid multiple connections
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try{
        // Connect to MongoDB
        const db = await mongoose.connect(process.env.MONGODB_URI || '' , {});
        
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    }catch(error){
        console.error("Error connecting to database:", error);
        process.exit(1);
        
    }
}

export default dbConnect;

