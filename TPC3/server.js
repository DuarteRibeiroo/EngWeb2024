var http = require('http');
var fs = require('fs')
var url = require('url');
var axioss = require('axios');

function genMoviesListPage(content){
    
    pagHTML = `<!DOCTYPE html>
    <html>
        <head> 
            <meta charset="UTF-8">
            <title>Filmes</title>
            <link rel="stylesheet" href="/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue"> <h1>Lista de Filmes</h1> </header>
    
                <div class = "w3-container">
                    <table class = "w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Título</th>
                            <th>Ano</th>
                        </tr>`

    content.forEach(entry => {
        pagHTML += `
            <tr>
                <td><a href='/movies/${entry.id}'>${entry.id}</a></td>
                <td>${entry.title}</td>
                <td>${entry.year}</td>
            </tr>
        `
    });
    pagHTML += `
        </body>
    </html>`
    return pagHTML
}

function genMovieEntryPage(entry){
    pagHTML = `<!DOCTYPE html>
    <html>
        <head> 
            <meta charset="UTF-8">
            <title>Filme</title>
            <link rel="stylesheet" href="/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue"> <h1>Filme ${entry.id} </h1> </header>
    
                <div class = "w3-container">
                    <table class = "w3-table w3-striped">
                    <pre>
                        ${JSON.stringify(entry)}
                    </pre>
                </div>
                <footer class="w3-container w3-blue"> <h5><a href = '/movies'>Voltar à lista de filmes</a> </h5> </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

function genActorsListPage(content){
    
    pagHTML = `<!DOCTYPE html>
    <html>
        <head> 
            <meta charset="UTF-8">
            <title>Atores</title>
            <link rel="stylesheet" href="/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue"> <h1>Lista de Atores</h1> </header>
    
                <div class = "w3-container">
                    <table class = "w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Nome</th>
                        </tr>`

    content.forEach(entry => {
        pagHTML += `
            <tr>
                <td><a href='/movies/${entry.id}'>${entry.id}</a></td>
                <td>${entry.Name}</td>
            </tr>
        `
    });
    pagHTML += `
        </body>
    </html>`
    return pagHTML
}

function genActorEntryPage(entry){
    pagHTML = `<!DOCTYPE html>
    <html>
        <head> 
            <meta charset="UTF-8">
            <title>Ator</title>
            <link rel="stylesheet" href="/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue"> <h1>Ator ${entry.id} </h1> </header>
    
                <div class = "w3-container">
                    <table class = "w3-table w3-striped">
                    <pre>
                        ${JSON.stringify(entry)}
                    </pre>
                </div>
                <footer class="w3-container w3-blue"> <h5><a href = '/actors'>Voltar à lista de atores</a> </h5> </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

function genGenresListPage(content){
    
    pagHTML = `<!DOCTYPE html>
    <html>
        <head> 
            <meta charset="UTF-8">
            <title>Géneros</title>
            <link rel="stylesheet" href="/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue"> <h1>Lista de Géneros</h1> </header>
    
                <div class = "w3-container">
                    <table class = "w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Título</th>
                            <th>Ano</th>
                        </tr>`

    content.forEach(entry => {
        pagHTML += `
            <tr>
                <td><a href='/movies/${entry._id}'>${entry.id}</a></td>
                <td>${entry.Name}</td>
            </tr>
        `
    });
    pagHTML += `
        </body>
    </html>`
    return pagHTML
}

function genGenreEntryPage(entry){
    pagHTML = `<!DOCTYPE html>
    <html>
        <head> 
            <meta charset="UTF-8">
            <title>Género</title>
            <link rel="stylesheet" href="/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue"> <h1>Género ${entry.id} </h1> </header>
    
                <div class = "w3-container">
                    <table class = "w3-table w3-striped">
                    <pre>
                        ${JSON.stringify(entry)}
                    </pre>
                </div>
                <footer class="w3-container w3-blue"> <h5><a href = '/genres'>Voltar à lista de géneros</a> </h5> </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

http.createServer(function (req,res){
    var movie_entry_regex = /\/movies\/[a-z0-9]{24}/
    var actor_entry_regex = /\/actors\/[a-z0-9]{4}/
    var genre_entry_regex = /\/genres\/[a-z0-9]{4}/
    var q = url.parse(req.url,true)
    console.log(q.pathname)
    if(q.pathname == '/'){
        fs.readFile('pages/home.html',function(err,data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data)
            res.end()
        })
    }
    else if(q.pathname == '/movies'){
        axioss.get('http://localhost:3000' + q.pathname)
        .then(function(resp){
            dados = resp.data
            pagHTML = genMoviesListPage(dados)
            res.writeHead(200, {'Content-Type': 'text/html; charset= utf-8'});
            res.write(pagHTML)
            res.end()
        })
        .catch(function(err){ 
            res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
            res.write('<p> Erro!</p>')
            res.write('<pre>' + q.pathname + '</pre>')
            res.end()
            console.log(err)
        })
    }
    else if(q.pathname == '/actors'){
        axioss.get('http://localhost:3000' + q.pathname)
        .then(function(resp){
            dados = resp.data
            pagHTML = genActorsListPage(dados)
            res.writeHead(200, {'Content-Type': 'text/html; charset= utf-8'});
            res.write(pagHTML)
            res.end()
        })
        .catch(function(err){ 
            res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
            res.write('<p> Erro!</p>')
            res.write('<pre>' + q.pathname + '</pre>')
            res.end()
            console.log(err)
        })
    }
    else if(q.pathname == '/genres'){
        axioss.get('http://localhost:3000' + q.pathname)
        .then(function(resp){
            dados = resp.data
            pagHTML = genGenresListPage(dados)
            res.writeHead(200, {'Content-Type': 'text/html; charset= utf-8'});
            res.write(pagHTML)
            res.end()
        })
        .catch(function(err){ 
            res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
            res.write('<p> Erro!</p>')
            res.write('<pre>' + q.pathname + '</pre>')
            res.end()
            console.log(err)
        })
    }
    else if(q.pathname.match(movie_entry_regex)){
        axioss.get('http://localhost:3000' + q.pathname)
        .then(function(resp){
            dados = resp.data
            pagHTML = genMovieEntryPage(dados)
            res.writeHead(200, {'Content-Type': 'text/html; charset= utf-8'});
            res.write(pagHTML)
            res.end()
        })
        .catch(function(err){ 
            res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
            res.write('<p> Erro!</p>')
            res.write('<pre>' + q.pathname + '</pre>')
            res.end()
            console.log(err)
        })
    }
    else if(q.pathname.match(actor_entry_regex)){
        axioss.get('http://localhost:3000' + q.pathname)
        .then(function(resp){
            dados = resp.data
            pagHTML = genActorEntryPage(dados)
            res.writeHead(200, {'Content-Type': 'text/html; charset= utf-8'});
            res.write(pagHTML)
            res.end()
        })
        .catch(function(err){ 
            res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
            res.write('<p> Erro!</p>')
            res.write('<pre>' + q.pathname + '</pre>')
            res.end()
            console.log(err)
        })
    }
    else if(q.pathname.match(genre_entry_regex)){
        axioss.get('http://localhost:3000' + q.pathname)
        .then(function(resp){
            dados = resp.data
            pagHTML = genGenreEntryPage(dados)
            res.writeHead(200, {'Content-Type': 'text/html; charset= utf-8'});
            res.write(pagHTML)
            res.end()
        })
        .catch(function(err){ 
            res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
            res.write('<p> Erro!</p>')
            res.write('<pre>' + q.pathname + '</pre>')
            res.end()
            console.log(err)
        })
    }

    else if(q.pathname == '/w3.css'){
        fs.readFile('css/w3.css',function(err,data){
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data)
            res.end()
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset= utf-8'});
        res.write('<p> Erro: Página não encontrada!</p>')
        res.write('<pre>' + q.pathname + '</pre>')
        res.end()
    }
    
}).listen(7777);