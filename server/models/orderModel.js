const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: String,
                require: true
            },
            title: {
                type: String,
                require: true
            },
            img: {
                type: String,
                require: true
            }
        },
    ],
    shippingAddress: {
        fullName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        zip: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        },


    },
    paymentMethod: {
        type: String,
        require: true
    },
    paymentStatus: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    orderStatus: {
        type: String,
        default: "panding"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);