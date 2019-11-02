const User = require('../models/user.model');
let bcrypt = require('bcryptjs');

exports.register = (req,res) =>
{
    User.findOne({ username: req.body.username },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while registering user', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(401).send({ message: 'User already exists' });
            }
            else
            {
                var hashedPassword = bcrypt.hashSync(req.body.password,10);
                var user = new User(
                    {
                        username: req.body.username,
                        email: req.body.email,
                        contact: req.body.contact,
                        age: req.body.age,
                        annualIncome: req.body.annualIncome,
                        password: hashedPassword,
                        admin: false
                    }
                );
                user.save((er) =>
                {
                    if(er)
                    {
                        res.status(500).send({ message: 'Error while registering User',error: er });
                    }
                    else
                    {
                        res.status(200).send({ message: 'User registered successfully' });
                    }
                })
            }
        }
    });
};

exports.login = (req,res) =>
{
    User.findOne({ username: req.body.username },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while Logging in', error: err });
        }
        else
        {
            if(ans)
            {
                var pass = bcrypt.compareSync(req.body.password,ans.password);
                if(pass)
                {
                    res.status(200).send({ message: 'Login Successful', username: ans.username, email: ans.email, contact: ans.contact, walletBalance: ans.walletBalance, admin: ans.admin });
                }
                else
                {
                    res.status(401).send({ message: 'Wrong Password' });
                }
            }
            else
            {
                res.status(404).send({ message: 'User does not exist, please register' });
            }
        }
    })
};
exports.viewProfile = (req,res) =>
{
    User.findOne({ username: req.query.username },{ password: 0 },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while fetching User Information', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(200).send(ans);
            }
            else
            {
                res.status(404).send({ message: 'User does not exist, please register' });
            }
        }
    })
}