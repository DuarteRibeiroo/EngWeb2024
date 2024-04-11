var Pessoa = require('../models/pessoa');

module.exports.list = () => {
    return Pessoa
        .find()
        .exec();
}

module.exports.list = (sort, order) => {
    return Pessoa
        .find()
        .exec();
}

module.exports.findById = id => {
    return Pessoa
        .findOne({_id: id})
        .exec();
}

module.exports.insert = a => {
    return Pessoa.create(a);
}

module.exports.update = (id, a) => {
    return Pessoa
        .findOneAndUpdate({_id: id}, a, {new: true})
        .exec();
}

module.exports.remove = id => {
    return Pessoa
        .deleteOne({_id: id})
        .exec();
}

module.exports.getAllModalidades = () => {
    return Pessoa
        .distinct('desportos')
        
}

module.exports.getPessoasPratModalidade = (mod) =>{
    return Pessoa
        .find({desportos: mod},{nome:1,_id:0})
}