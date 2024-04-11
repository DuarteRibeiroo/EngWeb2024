var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa');


router.get('/', function(req, res, next) {
    Pessoa.list()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/:id', function(req, res, next) {
    Pessoa.findById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))

});

router.post('/edit/:id', function(req, res, next) {
    Pessoa.update(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.post('/registo', function(req, res, next) { 
    Pessoa.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

router.post('/delete/:id', function(req, res, next) { 
    Pessoa.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
