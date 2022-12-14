const {connect }=require('getstream');
const crypto=require('crypto');
const bcrypt=require('bcrypt');
const StreamChat=require('stream-chat').StreamChat;

require('dotenv').config();

const api_key=process.env.STREAM_API_KEY;
const api_secret=process.env.STREAM_API_SECRET;
const app_id=process.env.STREAM_APP_ID;

const signup = async(req,res)=>{
    try {
        const {fullName,username,password,phone}=req.body;
        const userId=crypto.randomBytes(16).toString('hex');
        const serverClient=connect(api_key,api_secret,app_id);
        const hashedPassword = await bcrypt.hash(password,10);
        const   token=serverClient.createUserToken(users[0].id);
        res.status(200).json({token,fullName,username,userId,hashedPassword,phone});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }

};

const login= async(req,res) => { 
    try {
        const {username,password}=req.body;

        const serverClient=connect(api_key,api_secret,app_id);
        const client=StreamChat.getInstance(api_key,api_secret);

        const {users } = await client.queryUsers({name:username});
        if (!users.length) return res.status(400).json({message:"User not found!"});
    
        const success=await bcrypt.compare(password,user[0].hashedPassword);
        const token=serverClient.createUserToken(users[0].id);

        if(success){
            res.status(200).json({token, fullName:users[0].fullName ,username, userID:users[0].id});

        }
        else{
            res.status(504).json({message:"UserName or password InCorrect!"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }

 };

 module.exports={signup,login};