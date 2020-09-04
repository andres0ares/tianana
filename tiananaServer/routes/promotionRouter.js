const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.options((req, res) => { res.sendStatus(200); })
.get((req, res, next) => {
    
    Promotion.find({})
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    
    Promotion.create(req.body)
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content_type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));

})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions`);

})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    Promotion.remove({})
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content_type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
});

promotionRouter.route('/:promotionId')
.options((req, res) => { res.sendStatus(200) })
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 434;
    res.end(`POST method not supported on ${req.params.promotionId}.`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
        .then((promotion) => {
            res.sendStatus = 200;
            res.setHeader('Content_Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));  
});

module.exports = promotionRouter;