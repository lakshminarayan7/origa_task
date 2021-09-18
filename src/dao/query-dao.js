const userModel = require('../model/user-schema');
const orderModel = require('../model/order-schema');

exports.createUser = (payload) => {
    return new userModel({
        name: payload.name,
        userId: payload.userId
    }).save();
};

exports.createOrder = (payload) => {
    return new orderModel({
        orderId: payload.orderId,
        userId: payload.userId,
        sub_total: payload.sub_total,
        date: payload.date
    }).save();
};

exports.getData = (conditions = {}) => {
    return userModel.find(conditions);
};

exports.getByConditions = (conditions) => {
    return orderModel.find(conditions);
}

exports.updateByCondition = (condition, updateFields) => {
    return userModel.updateOne(condition, updateFields);
};

exports.getInfo = async () => {
    let list = await orderModel.aggregate([
        {
            $group: { _id: "$userId", noOfOrders: { $sum: 1 }, averageBillValue: { $avg: "$sub_total" } }
        },
        {
            $lookup: {
                "from": "users",
                "localField": "_id",
                "foreignField": "userId",
                "as": "Users"
            }
        },
        {
            $unwind: "$Users"
        },
        { "$sort": { "Users.userId": 1 } },
        {
            $project: {
                _id: 0,
                name: "$Users.name",
                userId: "$_id",
                noOfOrders: 1,
                averageBillValue: 1
            }
        },
    ]);
    return list;
};
