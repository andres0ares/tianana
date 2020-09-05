const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');
const cors = require('./cors');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    
    Promotion.find(req.query)
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    
    Promotion.create(req.body)
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content_type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));

})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions`);

})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    Promotion.remove(req.query)
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content_type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
});

promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 434;
    res.end(`POST method not supported on ${req.params.promotionId}.`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {new: true})
        .then((promotion) => {
            res.sendStatus = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));        
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
        .then((promotion) => {
            res.sendStatus = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));  
});

module.exports = promotionRouter;