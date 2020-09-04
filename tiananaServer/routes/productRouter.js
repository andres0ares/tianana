const express = require('express');
const bodyParser = require('body-parser');

const Products = require('../models/product');
const { findById } = require('../models/product');
var authenticate = require('../authenticate');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.options((req, res) => { res.sendStatus(200); })
.get((req, res, next) => {
    Products.find({})
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content_Type', 'application/json');
        res.json(products);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.create(req.body)
        .then((Product) => {
            console.log('Product Created ', Product);
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(Product);
        },  (err) => next(err))
        .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /products`);
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (rep, res, next) => {
    Products.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

productRouter.route('/:productId')
.options((req, res) => { res.sendStatus(200) })
.get((req, res, next) => {
    Products.findById(req.params.productId)
        .then((products) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(products);
        }, (err) => next(err))
        .catch((err) => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 434;
    res.end(`POST method not supported on ${req.params.productId}.`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, {new: true})
        .then((product) => {
            res.sendStatus = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));        
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findByIdAndDelete(req.params.productId)
        .then((product) => {
            res.sendStatus = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(product);
        }, (err) => next(err))
        .catch((err) => next(err));  
})

productRouter.route('/:productId/options')
.options((req, res) => { res.sendStatus(200) })
.get((req, res, next) => {
    Products.findById(req.params.productId)
        .then((product) => {
            if (product != null) {
                res.statusCode = 200;
                res.setHeader('Content_Type', 'application/json');
                res.json(product.options);
            }
            else {
                err = new Error('Options ' + req.params.productId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findById(req.params.productId)
        .then((product) => {
            product.options.push(req.body)
            product.save()
                .then((product) => {
                    Products.findById(product._id)
                        .then((product) => {
                            res.statusCode = 200;
                            res.setHeader('Content_Type', 'application/json');
                            res.json(product.options);
                        }, (err) => next(err))
                }, (err) => next(err))
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.sendStatus = 403;
    res.end(`PUT Operation not supported on /products/${req.params.productId}/options`);
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findById(req.params.productId)
        .then((product) => {
            product.options = [];
            product.save()
                .then((product) => {
                    res.sendStatus = 200;
                    res.setHeader('Content_type', 'application/json');
                    res.json(product);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
});

productRouter.route('/:productId/options/:optionId')
.options((res, req) => { res.statusCode(200) })
.get((req, res, next) => {
    Products.findById(req.params.productId)
        .then((product) => {
            if (product != null && product.options.id(req.params.optionsId) != null) {
                res.statusCode = 200;
                res.setHeader('Content_Type', 'application/json');
                res.json(product.options.id(req.params.optionId));
            }
            else if (product == null) {
                err = new Error('Product ' + req.params.productId + ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                err = new Error('Option ' + req.params.optionId + ' not found');
                err.status = 404;
                return next(err);
            }
        },  (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /products/` + req.params.productId 
        + '/options' + req.params.optionId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findById(req.params.productId)
        .then((product) => {
            if (req.body.name) {
                product.options.id(req.params.optionId).name = req.body.name;
            }
            if (req.body.color) {
                product.options.id(req.params.optionId).color = req.body.color;
            }
            if (req.body.fabric) {
                product.options.id(req.params.optionId).fabric = req.body.fabric;
            }
            if (req.body.image) {
                product.options.id(req.params.optionId).image = req.body.image;
            }
            product.save()
                .then((product) => {
                    res.statusCode = 200;
                    res.setHeader('Content_Type', 'application/json');
                    res.json(product.options.id(req.params.optionId))
                }, (err) => next(err))
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    Products.findById(req.params.productId)
        .then((product) => {
            
            product.options.id(req.params.optionId).remove();

            product.save()
                .then((product) => {
                    res.statusCode = 200;
                    res.setHeader('Content_Type', 'application/json');
                    res.json(product);
                }, (err) => next(err))
        }, (err) => next(err))
        .catch((err) => next(err));
})

module.exports = productRouter;

