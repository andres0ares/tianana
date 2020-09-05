const express = require('express');
const bodyParser = require('body-parser');
const Pedidos = require('../models/pedido');
const authenticate = require('../authenticate');
const cors = require('./cors');

const pedidoRouter = express.Router();

pedidoRouter.use(bodyParser.json());

pedidoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    
    if(req.user.admin){
        Pedidos.find(req.query)
        .populate('user')
        .populate('product')
            .then((pedidos) => {
                res.statusCode = 200;
                res.setHeader('Content_Type', 'application/json');
                res.json(pedidos);
            }, (err) => next(err))
            .catch((err) => next(err));
    }
    else {
        Pedidos.findOne({user: req.user._id})
        .populate('user')
        .populate('product')
            .then((pedidos) => {
                res.statusCode = 200;
                res.setHeader('Content_Type', 'application/json');
                res.json(pedidos);
            }, (err) => next(err))
            .catch((err) => next(err));
    }

    
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    var test = new Pedidos();
    
    Pedidos.findOne({user: req.user.id}, (err, pedidoList) => {
        
        if(err){
            next(err);
        }
        if (!err && pedidoList !== null) {
            console.log("passou 1");

            // Verify if the request is already in. | Verifica se o pedido já foi adicionado.
            
            var alreadyIn = pedidoList.pedidos.find(element => element.product == req.body.product && element.option == req.body.option);

            // Verify if there is an active request. | Verifica se há algum pedido ativo.
            
            var ativo = 0;
            for(i = 0; i < pedidoList.pedidos.length; i++ ){
                if(pedidoList.pedidos[i].product == req.body.product && pedidoList.pedidos[i].option == req.body.option) {
                    if(pedidoList.pedidos[i].ativo == true)
                    ativo++
                } 
            }
            
            // ----

            if (alreadyIn !== null && ativo <= 0 ) { 
                console.log(req.body);
                pedidoList.pedidos.push(req.body);

                Pedidos.findOneAndUpdate({user: req.user.id}, {
                    $set: pedidoList
                }, { new: true})
                    .then((Pedidos) => {
                        res.statusCode = 200;
                        res.setHeader('Content_Type', 'application/json');
                        res.json(Pedidos);
                    },  (err) => next(err));

            } else {
                res.statusCode = 403;
                res.end(` Already added.`);
            }
            
        }
        else {
        
            test.user = req.user._id;
            test.pedidos.push(req.body);

            Pedidos.create(test)
            .then((pedidos) => {
                res.statusCode = 200;
                res.setHeader('Content_Type', 'application/json');
                res.json(pedidos);
            },  (err) => next(err))
        }
    })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /pedidos. `);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /pedidos. `);
})

pedidoRouter.route('/:pedidoId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOne({user: req.user._id})
    .populate('user')
    .populate('product')
        .then((pedido) => {
            if (!pedido) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": false, "pedidos": pedido});
            }
            else {
                if (pedido.pedidos.findIndex(element => element._id = req.params.pedidoId) < 0) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({"exists": false, "pedidos": pedido});
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({"exists": true, "pedidos": pedido});
                }
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /pedidos/${req.params.pedidoId}. `);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOne({user: req.user.id}, (err, pedidoList) => {
        
        if(err){
            next(err);
        }
        if (!err && pedidoList !== null) {

            var pedido = pedidoList.pedidos.find(element => element._id = req.params.pedidoId);

            if(pedido !== undefined ){

                pedidoList.pedidos.find(element => element._id = req.params.pedidoId).ativo = req.body.ativo;

                Pedidos.findOneAndUpdate({user: req.user.id}, {
                    $set: pedidoList
                })
                .then((pedido) => {
                    res.statusCode = 200;
                    res.setHeader('Content_Type', 'application/json');
                    res.json(pedido.pedidos.find(element => element._id = req.params.pedidoId));
                },  (err) => next(err));

            }else{
                res.statusCode = 404;
                res.end(`/pedidos/${req.params.pedidoId} not found `);
            }

        }else {
            res.statusCode = 404;
            res.end(`/pedidos/${req.params.pedidoId} not found `);
        }
    });
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOne({user: req.user.id}, (err, pedidoList) => {
        
        if(err){
            next(err);
        }
        if (!err && pedidoList !== null) {

            var pedido = pedidoList.pedidos.find(element => element._id = req.params.pedidoId);

            if(pedido !== undefined ){

                var index = pedidoList.pedidos.findIndex(element => element._id = req.params.pedidoId)
                pedidoList.pedidos.splice(index, 1);

                Pedidos.findOneAndUpdate({user: req.user.id}, {
                    $set: pedidoList
                })
                .then((pedido) => {
                    res.statusCode = 200;
                    res.setHeader('Content_Type', 'application/json');
                    res.json(pedido);
                },  (err) => next(err));

            }else{
                res.statusCode = 404;
                res.end(`/pedidos/${req.params.pedidoId} not found `);
            }

        }else {
            res.statusCode = 404;
            res.end(`/pedidos/${req.params.pedidoId} not found `);
        }
    });
});



module.exports = pedidoRouter;