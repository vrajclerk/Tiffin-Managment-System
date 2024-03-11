const orderModel = require("../models/order");
const foodModel = require("../models/food");
const providerModel = require("../models/provider");
const { sendEmail } = require("../utils/sendEmail");
exports.addOrder = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user)
      return res.status(400).json({ message: "Plzz Login to make orders" });
    const data = req.body;
    // console.log("data");
    // console.log(data)
    // console.log("heloooooo")
    const obj = { user, ...data };
    //   const order = (await orderModel.create(obj)).populate("provider");
    const createdOrder = await orderModel.create(obj);
    const populatedOrder = await orderModel.populate(createdOrder, [
      { path: "provider" },
    ]);
    const food = await foodModel.findById(data.food);
    // const foodArray = await foodModel.getAllFoodsOfProvider(data.provider._id)
    const foodArray = await foodModel
      .find({ provider: data.provider})
      .populate("provider");
    console.log("foodarray");
    console.log(foodArray);

    // const quantity = food.quantity - data.quantity
    const dataArray = data.food;
    console.log("dataarray");
    console.log(dataArray);
    for (const food of foodArray) {
      const matchingData = dataArray.find((data) => data.name === food.name);

      // If a matching data is found, update the quantity in MongoDB
      if (matchingData) {
        const newQuantity = food.quantity - matchingData.amount;

        // Use findByIdAndUpdate to update the quantity in the database
        await foodModel.findByIdAndUpdate(food._id, {
          $set: { quantity: newQuantity },
        });
      }
      // If no matching data is found, you can handle it accordingly
      // (e.g., leave the quantity unchanged or set it to a default value)
    }

    console.log(foodArray);

    // await foodModel.findByIdAndUpdate(food._id,{$set:{quantity}})
    const subject = "Ordered: Your Order for Food is Successfull";
    const message = `Hi ${req.user.name} \n Your Order for ${food.name} is Successfull \n Thank You`;
    const email = req.user.email;

    await sendEmail({ email, subject, message });
    return res.status(200).json({ populatedOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const user = req.user._id;
    if (!user)
      return res.status(400).json({ message: "Plzz Login to fetch orders" });

    const orders = await orderModel
      .find({ user })
      .populate("food user provider");
    if (!orders) return res.status(404).json({ message: "No orders Found" });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getProvidersOrders = async (req, res) => {
  try {
    const provider = req.provider._id;
    if (!provider)
      return res.status(400).json({ message: "Plzz Login to fetch orders" });

    const orders = await orderModel
      .find({ provider })
      .populate("user food")
      .sort({ createdAt: -1 });

    if (!orders) return res.status(404).json({ message: "No orders Found" });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(404).json({ message: "Invalid Request" });

    await orderModel.findByIdAndDelete(_id);

    return res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const role = req.body.role;
    const status = req.body.status;
    const id = req.body._id;
    console.log("req body");
    console.log(req.body);
    let email1;
    let subject, message, email;
    if(status === "")
    return res.status(400).json({ message: "No Order Found" });
    if (role == "provider") {
      if (status === "Delivered") {
        subject = "Delivered: Your Order for Food is Delivered Successfully";
        message = `Hi ${req.body.user.name} \n Your Order for ${req.body.food.name} has been delivered \n Thank You`;
        email = req.body.user.email;
        console.log("hello");
      } else {
        subject = "Cancelled: Order has been Cancelled";
        message = `Hi ${req.body.user.name} Your Order for "has been Cancelled by "`;
        email = req.body.user.email;
        let dataArray = req.body.food;
        console.log("dataarray", dataArray);
        let provider_id = req.body.provider;
        const foodArray = await foodModel
          .find({ provider: req.body.provider })
          .populate("provider");
        console.log("foodarray", foodArray);
        // change quantiti logic
        for (const food of foodArray) {
          const matchingData = dataArray.find(
            (data) => data.name === food.name
          );

          // If a matching data is found, update the quantity in MongoDB
          if (matchingData) {
            const newQuantity = food.quantity + matchingData.amount;

            // Use findByIdAndUpdate to update the quantity in the database
            await foodModel.findByIdAndUpdate(food._id, {
              $set: { quantity: newQuantity },
            });
          }
          // If no matching data is found, you can handle it accordingly
          // (e.g., leave the quantity unchanged or set it to a default value)
        }
      }
    } else {
      subject = "Cancelled: Order has been Cancelled";
      message = `Hi ${req.body.user.name} Your Order for ${req.body.food.name} has been Cancelled by ${req.body.user.name}`;
      email = req.body.user.email;
      
      let dataArray = req.body.food;
        console.log("dataarray", dataArray);
        let provider_id = req.body.provider;
        const foodArray = await foodModel
          .find({ provider: req.body.provider })
          .populate("provider");
        console.log("foodarray", foodArray);
        // change quantiti logic
        for (const food of foodArray) {
          const matchingData = dataArray.find(
            (data) => data.name === food.name
          );

          // If a matching data is found, update the quantity in MongoDB
          if (matchingData) {
            const newQuantity = food.quantity + matchingData.amount;

            // Use findByIdAndUpdate to update the quantity in the database
            await foodModel.findByIdAndUpdate(food._id, {
              $set: { quantity: newQuantity },
            });
          }
    }
}

    await sendEmail({ email, subject, message });

    if (!id) return res.status(400).json({ message: "No Order Found" });
  
    const updatedOrder = await orderModel
      .findByIdAndUpdate(id, { orderStatus: status }, { new: true })
      .populate("user");
console.log(updatedOrder)


    return res.status(200).json({ updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
