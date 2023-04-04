const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleWare/authMiddleware");
const Order = require("../models/orderModel");

const router = require("express").Router();

//Create order
router.post("/", verifyToken, async (req, res) => {

    const { totalPrice, products,
        shippingAddress,
        paymentMethod } = req.body;

    const createOrder = new Order({ totalPrice: totalPrice, products: products, shippingAddress: shippingAddress, paymentMethod: paymentMethod, author: req.user })
    try {

        const savedOrder = await createOrder.save();
        res.status(201).json(savedOrder)
        console.log(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }

})

//updation order by Admin
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }

});

//updating order by user 
router.put("/user/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }

});


//Delete 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
});

//viewing user Order by id
router.get("/myId/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
});

//viewing All user Order
router.get("/myOrder", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.find({ author: req.user.id });
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get All Order Detailes on Admin Panal
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {
        const allOrdersDetails = await Order.find();
        res.status(200).json(allOrdersDetails)
    } catch (error) {
        res.status(500).json(error)
    }

});

//Monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    let date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    try {

        let income = await Order.aggregate([
            {
                $match: { createdAt: { $gte: prevMonth } },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            {
                $group: { _id: "$month", total: { $sum: "$sales" } },
            },
        ]);
        res.status(200).json(income);

    } catch (error) {
        res.status(500).json(error);
    } console.log(income);
})

module.exports = router;