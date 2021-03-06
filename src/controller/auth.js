const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            error : {
                message: 'User already registered',
            }
        });

        const {
            firstName,
            lastName,
            email,
            password 
        } = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({ error : error });
            }
            if(data){
                return res.status(201).json({
                    message: 'User created successfully'
                })
            }
        });
    });

}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error : error });
        if(user){

            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    message : 'Login SuccessFull',
                    user: {_id, firstName, lastName, email, role, fullName,token}
                });
            }else{
                return res.status(400).json({
                    error : {
                        message: 'Invalid password'    
                    }
                    
                });
            }
        }else{
            return res.status(400).json({error: {
                message: 'something went wrong'
            }});

        }
    });
}

