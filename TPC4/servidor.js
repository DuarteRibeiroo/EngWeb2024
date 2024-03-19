var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var Server = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == "/compositores"){
                    axios.get('http://localhost:3000/compositores')
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.compositoresListPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos')
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.periodosListPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/[Cc][0-9]{1,3}/.test(req.url)){
                    axios.get('http://localhost:3000/compositores/' + req.url.split("/")[2])
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.compositorPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                else if(/\/periodos\/[A-Za-z0-9]{4}/.test(req.url)){
                    axios.get('http://localhost:3000/periodos/' + req.url.split("/")[2])
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.periodoPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(templates.compositoresFormPage(d))
                    res.end()
                }
                // GET /periodos/registo --------------------------------------------------------------------
                else if(req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(templates.periodosFormPage(d))
                    res.end()
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/[Cc][0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split("/")
                    idcompositor = partes[partes.length - 1]
                    axios.get('http://localhost:3000/compositores/' + idcompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.compositoresFormPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(522, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/[A-Za-z0-9]{4}/.test(req.url)){
                    var partes = req.url.split("/")
                    idperiodo = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/' + idperiodo)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.periodosFormPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(522, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/[Cc][0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split("/")
                    idcompositor = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/compositores/' + idcompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(`<pre>` + JSON.stringify(response.data) + `</pre>\n` + `<a href="/compositores">Voltar</a>`)
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(521, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if(/\/periodos\/delete\/[A-Za-z0-9]{4}/.test(req.url)){
                    var partes = req.url.split("/")
                    idcompositor = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/periodos/' + idcompositor)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(`<pre>` + JSON.stringify(response.data) + `</pre>\n` + `<a href="/compositores">Voltar</a>`)
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(521, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                else if(/\/compositores\?periodo=(\w+)/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.compositoresListPage(response.data, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(erro, d))
                            res.end()
                        })
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.write(templates.errorPage(`Pedido GET não suportado: ${req.url}`, d))
                    res.end()
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post('http://localhost:3000/compositores', result)
                            .then(response => {
                                res.writeHead(201, {'Content-Type': 'text/html'})
                                res.write(templates.compositorPage(response.data, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(520, {'Content-Type': 'text/html'})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(`<p>Erro na obtenção dos dados do formulário</p>`, d))
                            res.end()
                        
                        }
                    })
                }
                // POST /periodos/registo --------------------------------------------------------------------
                if(req.url == "/periodos/registo"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post('http://localhost:3000/periodos', result)
                            .then(response => {
                                res.writeHead(201, {'Content-Type': 'text/html'})
                                res.write(templates.periodoPage(response.data, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(520, {'Content-Type': 'text/html'})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(`<p>Erro na obtenção dos dados do formulário</p>`, d))
                            res.end()
                        
                        }
                    })
                }
                // POST /compositores/edit/:id --------------------------------------------------------------------
                if(/\/compositores\/edit\/[Cc][0-9]{1,3}/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if (result){
                            var partes = req.url.split("/")
                            idAluno = partes[partes.length - 1]
                            axios.put('http://localhost:3000/compositores/' + idAluno, result)
                            .then(response => {
                                res.writeHead(201, {'Content-Type': 'text/html'})
                                res.write(templates.compositorPage(response.data, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(522, {'Content-Type': 'text/html'})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(`<p>Erro na obtenção dos dados do formulário</p>`, d))
                            res.end()
                        
                        }
                    })
                }
                // POST /periodos/edit/:id --------------------------------------------------------------------
                if(/\/periodos\/edit\/[Cc][0-9]{1,3}/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if (result){
                            var partes = req.url.split("/")
                            idperiodo = partes[partes.length - 1]
                            axios.put('http://localhost:3000/periodos/' + idperiodo, result)
                            .then(response => {
                                res.writeHead(201, {'Content-Type': 'text/html'})
                                res.write(templates.periodoPage(response.data, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(522, {'Content-Type': 'text/html'})
                                res.write(templates.errorPage(erro, d))
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.write(templates.errorPage(`<p>Erro na obtenção dos dados do formulário</p>`, d))
                            res.end()
                        
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.write(templates.errorPage(`Pedido POST não suportado: ${req.url}`, d))
                    res.end()
                }
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

Server.listen(7777, ()=>{
    console.log("Servidor á escuta na porta 7777...")
})