const express = require("express");
const route = express.Router();
const taskService = require('../service/taskList-service');

// To Create User
route.post('/create_user', (req, res) => {
    taskService.create_user(req.body).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
})

// To Create Order
route.post('/create_order', (req, res) => {
    taskService.create_order(req.body).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
})

// Get - Sum of Orders and Average of Sub_total
route.get('/getData', (req, res) => {
    taskService.getData(req.params).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
});

// Update Sum of Orders in User Collection
route.get('/update_order_info', (req, res) => {
    taskService.update_order_info(req.params).then((result) => {
        res.status(201).json(result);
    }).catch((error) => {
        res.status(error.status || 500).json(error);
    });
});

module.exports = route;