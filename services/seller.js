const mongoose = require('mongoose');
const Order = mongoose.model('Order');

const getOrderAggregate = (userId, page, limit) => {
    return Order.aggregate([
        { "$match": { "sellerId": userId } },
        {
            "$lookup": {
                "from": "products",
                "localField": "productId",
                "foreignField": "_id",
                "as": "product"
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "buyerId",
                "foreignField": "_id",
                "pipeline": [
                    { "$project": { password: 0 } }
                ],
                "as": "buyer",

            }
        },
        { "$unwind": '$product' },
        { "$unwind": '$buyer' },
        {
            "$project": {
                "product": "$product",
                "buyer": "$buyer",
                "quantity": "$quantity"
            }
        },
        {
            '$facet': {
                metadata: [{ $count: "total" }],
                data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
            }
        }
    ])
}
module.exports = {
    getOrderAggregate
}