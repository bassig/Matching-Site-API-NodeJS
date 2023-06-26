const mongoose=require('mongoose');
const connect=async()=>{
    await mongoose.connect(process.env.DATABASE_URL)
    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to database  ", err);
    });
}
const disconnect=()=>{}

module.exports={connect,disconnect}