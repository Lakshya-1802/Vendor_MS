import express from "express";
import Vendor from "../models/vendorInfo.js";
import User from "../models/user.js";

const router = express.Router();

router.post('/create-vendor/:uid', async (req, res) => {
    const { uid } = req.params;
    const {
        vendorName,
        bankAccountNo,
        bankName,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
        createdBy
    } = req.body;
    if (!vendorName || !bankAccountNo || !bankName) {
        return res.status(400).json({ error: 'Please enter all the required fields' });
    }
    try {
        const existingUser = await User.findOne({ uid });
        if(!existingUser){
            return res.status(404).json({ error: 'User does not exist' });
        }
        const newVendor = new Vendor({
            uid,
            vendorName,
            bankAccountNo,
            bankName,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode,
            createdBy
        });
        const savedVendor = await newVendor.save();
        return res.status(201).json({ 
            message: 'Vendor created successfully', 
            vendor: savedVendor 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/vendors-by-uid/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const existingUser = await User.findOne({ uid });
        if(!existingUser){
            return res.status(404).json({ error: 'User does not exist' });
        }
        const vendors = await Vendor.find({ uid });
        if (vendors.length === 0) {
            return res.status(404).json({ message: 'No vendors found for the provided UID' });
        }
        return res.status(200).json({ vendors });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

router.patch('/update-vendor/:vid', async (req, res) => {
    const { vid } = req.params;
    const updateFields = req.body;
    delete updateFields._id;
    delete updateFields.uid;
    delete updateFields.vid;
    try {
        const updatedVendor = await Vendor.findOneAndUpdate({ vid }, updateFields, { new: true });
        if (!updatedVendor) {
            return res.status(404).json({ error: 'Vendor not found for the provided VID' });
        }
        return res.status(200).json({ message: 'Vendor updated successfully', vendor: updatedVendor });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

router.delete('/delete-vendor/:vid', async (req, res) => {
    const { vid } = req.params;
    try {
        const deletedVendor = await Vendor.findOneAndDelete({ vid });
        if (!deletedVendor) {
            return res.status(404).json({ error: 'Vendor not found for the provided VID' });
        }
        return res.status(200).json({ message: 'Vendor deleted successfully', vendor: deletedVendor });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
