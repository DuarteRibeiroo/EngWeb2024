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

router.get('/periodos/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(response => {
      res.render('periodo', {periodo: response.data,data: d, title: 'Período'});
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na obtenção do período!'})
    })
});

//DELETEs ------------------

router.get('/compositores/delete/:id', function(req,res,next){
  axios.delete('http://localhost:3000/compositores/' + req.params.id, req.body)
    .then(response => {
      var periodo = response.data.periodo
      axios.get('http://localhost:3000/compositores?periodo=' + periodo)
      .then(response => {
        if(response.data.length == 0){
          axios.get('http://localhost:3000/periodos?Periodo=' + periodo)
            .then(response2 => {
              axios.delete('http://localhost:3000/periodos/' + response2.data[0].id, req.body)
                .then(response => {
                })
                .catch(function(erro){
                    res.render('error', {error: erro, message: 'Erro na eliminação do período!'})
                })
            })
            .catch(function(erro){
                res.render('error', {error: erro, message: 'Erro na obtenção do período!'})
            })
        }
      })  
      res.redirect('http://localhost:7777/compositores/');
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na edição do compositor!'})
    })
})

//POSTs --------------------
router.post('/compositores/registo', function(req, res, next) {
  axios.get('http://localhost:3000/compositores?periodo=' + req.body.periodo)
    .then(response => {
      if(response.data.length == 0){
        var periodo = {
          Periodo: req.body.periodo
        }
        axios.post('http://localhost:3000/periodos', periodo)
          .then(response => {
          })
          .catch(function(erro){
              res.render('error', {error: erro, message: 'Erro na criação do período!'})
          })
      }
    })
  axios.post('http://localhost:3000/compositores', req.body)
    .then(response => {
      res.redirect('http://localhost:7777/compositores/' + req.body.id);
    })
    .catch(function(erro){
        res.render('error', {error: erro, message: 'Erro na criação do compositor!'})
    })
})

//PUTs ---------------------
router.post('/compositores/edit/:id', function(req,res,next){
  axios.get('http://localhost:3000/compositores/' + req.params.id)
    .then(response => {
      var periodo = response.data.periodo
      axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
        .then(response => {
          axios.get('http://localhost:3000/compositores?periodo=' + periodo)
          .then(response => {
            console.log(response.data)
            if(response.data.length == 0){
              axios.get('http://localhost:3000/periodos?Periodo=' + periodo)
                .then(response2 => {
                  var a= response2.data[0].id
                  axios.delete('http://localhost:3000/periodos/' + response2.data[0].id, req.body)
                    .then(response => {
                      axios.get('http://localhost:3000/compositores?periodo=' + req.body.periodo)
                        .then(response => {
                          if(response.data.length == 1){
                            var periodo2 = {
                              Periodo: req.body.periodo
                            }
                            axios.post('http://localhost:3000/periodos', periodo2)
                              .then(response => {
                                res.redirect('http://localhost:7777/compositores/' + req.params.id);
                              })
                              .catch(function(erro){
                                  res.render('error', {error: erro, message: 'Erro na criação do período!'})
                              })
                          }
                          else{
                            res.redirect('http://localhost:7777/compositores/' + req.params.id);
                          }
                        })
                    })
                    .catch(function(erro){
                        res.render('error', {error: erro, message: 'Erro na eliminação do período!'})
                    })
                })
                .catch(function(erro){
                    res.render('error', {error: erro, message: 'Erro na obtenção do período!'})
                })
            }
            else{
              res.redirect('http://localhost:7777/compositores/' + req.params.id);
            }
          })  
        })
        .catch(function(erro){
            res.render('error', {error: erro, message: 'Erro na edição do compositor!'})
        })
    })
    .catch(function(erro){
      res.render('error', {error: erro, message: 'Erro na obtenção do compositor!'})
  })
})


module.exports = router;
