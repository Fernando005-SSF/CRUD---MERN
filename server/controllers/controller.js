const Userdb = require('../model/model');


//create and save new user
exports.create = (req,res)=>{

    //validate user
    if(!req.body){
        res.status(400).send({message :"content can not be empty"});
        return;
    }

    //new user
    const user =new Userdb({

        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status : req.body.status

    });

    //save user inthe data base
    user.save(user)
                .then(data=>{
                    res.send(data)
                })
                .catch(err=>{
                    res.status(500).seend({
                        message:err.message || "some error occured"
                    });
                });
}


//retrieve and return all users/single user
exports.find =(req,res)=>{

}


//update users\
exports.update = (req,res)=>{

}


//delete user
exports.delete = (req,res)=>{

}