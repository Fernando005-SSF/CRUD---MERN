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
                    // res.send(data)
                    res.redirect('/add-user')
                })
                .catch(err=>{
                    res.status(500).send({
                        message:err.message || "some error occured"
                    });
                });
}


//retrieve and return all users/single user
exports.find =(req,res)=>{

    

    if(req.query.id){

        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404)
                .send({message:"There is no such a user"})
            }else{

                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500)
            .send({message:"Error in finding the user"})
        })

    }else{

        Userdb.find().
    then(user=>{
        res.send(user)
    
    })
          .catch(err=>{
        res.status(500).send({
            message:err.message || "can not retriew the user"
        });
    });
    }

    }



//update users
exports.update = (req,res)=>{

    if(!req.body){
        return res
        .status(400)
        .send({message:"data is empty"})
    }

    const id = req.params.id;

    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"user can not find"})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error occured in updating the user"})
    })
}




//delete user
exports.delete = (req,res)=>{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404)
            .send({message:"There is no such an id to delete"})
        }
        else{
            res
            .send({message:"User sucessfully deleted"})
        }
    })
    .catch(err=>{
        res.status(500)
        .send({message:"Error occured in deletion"})
    })    

}