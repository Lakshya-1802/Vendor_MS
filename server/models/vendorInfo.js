import mongoose from "mongoose";

const vidGenerator = () => {
    const time = Date.now();
    const vid = `VID${time}`; 
    return vid;
};

// Define Vendor Schema
const VendorSchema = new mongoose.Schema({
    vid: {
        type: String,
        unique: true,
        default: vidGenerator
    },
    uid: {
        type: String,
        required: true
    },
    vendorName: {
        type: String,
        required: [true, 'Vendor Name is required']
    },
    bankAccountNo: {
        type: String,
        required: [true, 'Bank Account No. is required']
    },
    bankName: {
        type: String,
        required: [true, 'Bank Name is required']
    },
    addressLine1: String,
    addressLine2: String,
    city: String,
    country: String,
    zipCode: String,
});

const Vendor = mongoose.model('Vendors', VendorSchema);
export default Vendor;
