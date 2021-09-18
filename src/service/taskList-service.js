const queryDAO = require('../dao/query-dao');
const res = require('../custom-response');
const { message } = require('../custom-response');

const taskService = {
    async create_user(bodyData) {
        try {

            if (!bodyData) {
                return Promise.reject(res.error(406, 'Invalid Payload'));
            }
            if (!bodyData.name) {
                return Promise.reject(res.error(406, 'Name is Mandatory'));
            }
            if (!bodyData.userId) {
                return Promise.reject(res.error(406, 'UserId is Mandatory'));
            }

            const getData = await queryDAO.getData({ userId: bodyData.userId });
            if (getData.length == 0) {
                const result = await queryDAO.createUser(bodyData);
                return Promise.resolve({ status: 200, message: 'User has been Created successfully with UserId - ' + bodyData.userId + '..!!' });
            } else {
                return Promise.resolve({ status: 409, message: 'User already exist with same UserId !!' });
            }

        } catch (error) {
            console.log("err", error)
            return Promise.reject(res.error(500, error.message, error.stack))
        }
    },

    async create_order(bodyData) {
        try {

            if (!bodyData) {
                return Promise.reject(res.error(406, 'Invalid Payload'));
            }
            if (!bodyData.orderId) {
                return Promise.reject(res.error(406, 'OrderId is Mandatory'));
            }
            if (!bodyData.userId) {
                return Promise.reject(res.error(406, 'UserId is Mandatory'));
            }
            if (!bodyData.date) {
                return Promise.reject(res.error(406, 'UserId is Mandatory'));
            }

            const getOrder = await queryDAO.getByConditions({ orderId: bodyData.orderId });
            if (getOrder.length == 0) {
                const result = await queryDAO.createOrder(bodyData);
                return Promise.resolve({ status: 200, message: 'Order has been created successfully ..!!' });
            } else {
                return Promise.resolve({ status: 409, message: 'OrderId already exist ...!!' });
            }

        } catch (error) {
            console.log("err", error)
            return Promise.reject(res.error(500, error.message, error.stack))
        }
    },

    async getData() {
        try {
            const data = await queryDAO.getInfo();
            if (data.length > 0) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(res.error(404, 'No Data Found !!'));
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },

    async update_order_info() {
        try {
            const data = await queryDAO.getInfo();
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const updateUser_data = await queryDAO.updateByCondition({ userId: data[i].userId }, { $set: { no_Of_Orders: data[i].noOfOrders } });
                    console.log(updateUser_data)
                }
                return Promise.resolve({ "status": true, message: "Successfully updated" });
            } else {
                return Promise.reject(res.error(404, 'No Data Found !!'));
            }
        } catch (error) {
            return Promise.reject(res.error(500, error.message, error.stack));
        }
    },
}
module.exports = taskService;