const db=require('../models/db');
const group=require('../models/group');

class GroupRepos{
    constructor(){
        db.connect();
    }
    async getAll(){
        return await group.find({});
    }
}

module.exports=new GroupRepos();