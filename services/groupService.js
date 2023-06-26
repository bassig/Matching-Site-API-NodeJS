const groupRepos=require('../repos/groupRepos');

class GroupServise{
    async getAll(){
        return await groupRepos.getAll();
    }
}

module.exports=new GroupServise();