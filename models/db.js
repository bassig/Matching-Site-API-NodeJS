const mongoose = require('mongoose');
class Connection {
    constructor() {
        const url = process.env.DATABASE_URL
        this.connect(url).then(() => {
            console.log('✔ Database Connected');
        }).catch((err) => {
            console.error('✘ MONGODB ERROR: ', err.message);
        });
    }
    async connect(url) {
        try {
            await mongoose.connect(url);
        } catch (e) {
            throw e;
        }
    }
    disconnect() {
        mongoose.disconnect().then(() => {
            console.log('Disconnected from database');
        }).catch((err) => {
            console.error('Error disconnecting from database:', err);
        });
    }
}


module.exports = new Connection();