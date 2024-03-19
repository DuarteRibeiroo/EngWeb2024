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
  axios.get('http://localhost:3000/compositores')
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
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(response => {
      res.render('editarCompositor', { compositor: response.data,data: d, title: 'Editar Compositor' });
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do compositor!'})
    })
})

router.get('/compositores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(response => {
      res.render('compositor', {compositor: response.data,data: d, title: 'Compositor'});
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do compositor!'})
    })
});

//GET periodos

router.get('/periodos', function(req,res,next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos')
    .then(response => {
      res.render('listaPeriodos', { lista: response.data,data: d, title: 'Lista de Períodos' });
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção da lista de períodos!'})
    })
})

router.get('/periodos/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoPeriodo', {data: d, title: 'Registar Período'});
});

router.get('/periodos/edit/:id', function(req,res,next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(response => {
      res.render('editarPeriodo', { periodo: response.data,data: d, title: 'Editar Período' });
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do periodo!'})
    })
})

router.get('/periodos/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(response => {
      res.render('periodo', {periodo: response.data,data: d, title: 'Período'});
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do compositor!'})
    })
});

//DELETEs ------------------

router.get('/compositores/delete/:id', function(req,res,next){
  axios.delete('http://localhost:3000/compositores/' + req.params.id, req.body)
    .then(response => {
      res.redirect('http://localhost:7777/compositores/');
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na edição do compositor!'})
    })
})

router.get('/periodos/delete/:id', function(req,res,next){
  axios.delete('http://localhost:3000/periodos/' + req.params.id, req.body)
    .then(response => {
      res.redirect('http://localhost:7777/periodos/');
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na edição do periodo!'})
    })
})




//POSTs --------------------
router.post('/compositores/registo', function(req, res, next) {
  axios.post('http://localhost:3000/compositores', req.body)
    .then(response => {
      res.redirect('http://localhost:7777/compositores/' + req.body.id);
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na criação do compositor!'})
    })
})

router.post('/periodos/registo', function(req, res, next) {
  axios.post('http://localhost:3000/periodos', req.body)
    .then(response => {
      res.redirect('http://localhost:7777/periodo/' + req.body.id);
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na criação do periodo!'})
    })
})

//PUTs ---------------------
router.post('/compositores/edit/:id', function(req,res,next){
  axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
    .then(response => {
      res.redirect('http://localhost:7777/compositores/' + req.params.id);
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na edição do compositor!'})
    })
})

router.post('/periodos/edit/:id', function(req,res,next){
  axios.put('http://localhost:3000/periodos/' + req.params.id, req.body)
    .then(response => {
      res.redirect('http://localhost:7777/periodos/' + req.params.id);
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na edição do periodo!'})
    })
})


module.exports = router;
