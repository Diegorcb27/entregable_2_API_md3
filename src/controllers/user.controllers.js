const catchError = require('../utils/catchError');
const User = require('../models/User');


//READ
const getAll = catchError(async(req, res) => {
    // Operaciones...

    const users = await User.findAll()
    return res.json(users)
});

//CREATE
const create=catchError(async(req, res)=>{
    const{first_name, last_name, email, password, birthday }=req.body;
    const user = await User.create({
        first_name: first_name,
        last_name: last_name, 
        email: email, 
        password: password, 
        birthday: birthday
    })
    return res.status(201).json(user)
});

//DELETE

const remove=catchError(async(req, res)=>{
    const {id}=req.params
    await User.destroy({where: {id:id}})
    return res.sendStatus(204)
});

//TRAER SOLO UNO
const getOne=catchError(async(req, res)=>{
    const {id}=req.params
    const user = await User.findByPk(id)
    return res.json(user);

})

//UPDATE

const update=catchError(async(req, res)=>{
    const {id}=req.params
    const{first_name, last_name, email, password, birthday }=req.body;
    const user = await User.update({
        first_name: first_name,
        last_name: last_name, 
        email: email, 
        password: password, 
        birthday: birthday
    }, {where: {id:id}, returning: true} )
    return res.json(user[1][0])

})

module.exports = {
    getAll,
    create,
    remove,
    getOne,
    update
}