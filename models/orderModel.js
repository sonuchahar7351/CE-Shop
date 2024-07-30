import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true // Ensures that products are provided
    }],
    payment: {
      //   method: { type: String, required: true }, // Example field for payment method
      //   status: { type: String, default: 'pending' } // Example field for payment status
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true // Ensures that a buyer is specified
    },
    status: {
        type: String,
        default: 'not_process',
        enum: ["not_process", "processing", "shipped", "delivered", "cancelled"] // Corrected spelling
    }
}, { timestamps: true });

// Export the Order model
export default mongoose.model('Order', orderSchema);
