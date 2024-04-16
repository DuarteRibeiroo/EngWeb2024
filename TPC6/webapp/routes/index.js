var express = require('express');
var router = express.Router();
var axios = require('axios')

//GETs ---------------------
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('index', { title: 'Gestão de Compositores', data: d});
});

router.get('/compositores', function(req,res,next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:12345/compositores')
    .then(response => {
      res.render('listaCompositores', { lista: response.data,data: d, title: 'Lista de Compositores' });
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção da lista de compositores!'})
    })
})

router.get('/compositores/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoCompositor', {data: d, title: 'Registar Compositor'});
});

router.get('/compositores/edit/:id', function(req,res,next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:12345/compositores/' + req.params.id)
    .then(response => {
      res.render('editarCompositor', { compositor: response.data,data: d, title: 'Editar Compositor' });
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do compositor!'})
    })
})

router.get('/compositores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:12345/compositores/' + req.params.id)
    .then(response => {
      res.render('compositor', {compositor: response.data,data: d, title: 'Compositor'});
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do compositor!'})
    })
});

//DELETEs ------------------

router.get('/compositores/delete/:id', function(req,res,next){
  axios.get('http://localhost:12345/compositores/delete/' + req.params.id)
    .then(response => {
      res.redirect('http://localhost:7777/compositores/');
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na edição do compositor!'})
    })
})

//POSTs --------------------
router.post('/compositores/registo', function(req, res, next) {
  axios.post('http://localhost:12345/compositores/registo', req.body)
    .then(response => {
      res.redirect('http://localhost:7777/compositores/' + req.body.id);
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na criação do compositor!'})
    })
})

//PUTs ---------------------
router.post('/compositores/edit/:id', function(req,res,next){
  axios.post('http://localhost:12345/compositores/edit' + req.params.id, req.body)
      .then(response => {
        res.redirect('http://localhost:7777/compositores/' + req.params.id);
      })
      .catch(function(erro){
          res.render('error', {error: erro, message: 'Erro na edição do compositor!'})
      })
    })

module.exports = router;
