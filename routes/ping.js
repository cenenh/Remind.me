/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var router = express.Router();
var res_data = "pong";

router.route('/ping')
    .get(function(req, res){
      res.status(200).json({
        req_method : req.method,
        code : 200,
        data : res_data
      });
    })
    .post(function(req, res){
      res.status(200).json({
        req_method : req.method,
        code : 200,
        data : res_data
      });
    })
    .put(function(req, res){
      res.status(200).json({
        req_method : req.method,
        code : 200,
        data : res_data
      });
    })
    .delete(function(req, res){
      res.status(200).json({
        req_method : req.method,
        code : 200,
        data : res_data
      });
    })

module.exports = router;
