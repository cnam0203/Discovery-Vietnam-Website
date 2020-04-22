const User = require('../models/UserModels')
const bcrypt = require('bcrypt')

exports.register = function(req, res){
    User.find({email: req.body.email}, (err, result) => {
        if (err) res.json({errors: err})
        else {
            console.log('hello')
            let find = false;
            let findUser = {};
            for (var index = 0; index < result.length; index++) {
                console.log('sdfwf')
                let user = result[index];
                let info = bcrypt.compareSync(req.body.password, user.password)
                if (info) {
                    find = true;
                    findUser = user
                    break;
                }
            }
            if (find) {
                res.json({errors: 'This account has been registered'})
            }
            else {
            bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                console.log('byebye')    
                if (err)  res.json({errors: err})
                    const user = new User(req.body)
                    user.password = hash;
                    user.save((err, result) => {
                        if (err) res.json({errors: err})
                        else {
                            req.session.user = result
                            res.json({user: result})
                        }
                    })
                })
            }
        }
    })
    // User.findOne({email: req.body.email}, (err, user) => {
    //     if(user == null){ //Kiểm tra xem email đã được sử dụng chưa
    //         bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
    //             if (err) {return res.json({errors: err})}
    //             const user = new User(req.body)
    //             user.password = hash;
    //             user.save((err, result) => {
    //                 if(err) {return res.json({errors: err})}
    //                 req.session.user = result
    //                 res.json({user: result})
    //             })
    //         })
    //     }else{
    //         res.json({errors: 'Email has been used'})
    //     }
    // })
}



exports.login = function(req, res){
    User.find({email: req.body.email}, (err, result) => {
        if (err) res.json({errors: err})
        else {
            let find = false;
            let findUser = {};
            for (var index = 0; index < result.length; index++) {
                let user = result[index];
                let info = bcrypt.compareSync(req.body.password, user.password)
                if (info) {
                    find = true;
                    findUser = user
                    break;
                }
            }
            if (find) {
                console.log('True')
                req.session.user = findUser
                res.json({
                    user: findUser,
                    login: "success"
                })
            } else {
                res.json({errors: 'This account is incorrect'})
            }
        }
    })
    // User.findOne({email: req.body.email}).exec(function(err, user){
    //     if(err) {
    //         return res.json({errors: err})
    //     }else if (!user){
    //         return res.json({errors: 'Username and Password are incorrect'})
    //     }
    //     bcrypt.compare(req.body.password, user.password, (err, result) => {
    //         if (err) res.json({errors: err})
    //         if(result === true){
    //             req.session.user = user
    //             res.json({
    //                 user: user,
    //                 login: "success"
    //             })
    //         }else{
    //             return res.json({errors: 'Username and Password are incorrect'})
    //         }
    //     })
    // })
}

exports.logout = function(req, res){
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                console.log('err')
                return res.json({errors: err});
            } else {
                console.log(req.session)
                return res.json({logout: "success"});
            }
        });
    }
}