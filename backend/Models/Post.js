class Post{
    constructor({userId,msg}){
        this.userid = userId;
        this.message = msg;
        this.timeStamp = new Date();
    }
}