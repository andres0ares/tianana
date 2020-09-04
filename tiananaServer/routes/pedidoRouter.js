const express = require('express');
const bodyParser = require('body-parser');
const Pedidos = require('../models/pedido');
const authenticate = require('../authenticate');

const pedidoRouter = express.Router();

pedidoRouter.use(bodyParser.json());

pedidoRouter.route('/')
.options((req, res) => { res.sendStatus(200); })
.get(authenticate.verifyUser, (req, res, next) => {
    Pedidos.findOne({user: req.user._id})
    .populate('user')
    .populate('produto')
        .then((pedidos) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(pedidos);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
    var test = new Pedidos();
    
    Pedidos.findOne({user: req.user.id}, (err, pedidoList) => {
        console.log(err, pedidoList, req.user.id, req.body.product_id, req.body.option)
        if(err){
            next(err);
        }
        if (!err && pedidoList !== null) {
            console.log("passou 1");
            
            var alreadyIn = pedidoList.pedidos.find(element => element.product == req.body.product);
            console.log(alreadyIn);
            if ( alreadyIn == null) { 
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
                res.statusCode = 434;
                res.end(` Already added.`);
            }
            
        }
        else {
            console.log("passou 2");

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

module.exports = pedidoRouter;