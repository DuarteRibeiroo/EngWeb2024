var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa');

router.get('/', function(req, res, next) {
    Pessoa.getAllModalidades()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:modalidade', function(req, res, next) {
    Pessoa.getPessoasPratModalidade(req.params.modalidade)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;