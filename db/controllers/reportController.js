const reportModel = require('../models/reportModel')

const createReport = async (report) => await reportModel(report).save()

const getReports = async (_id) => {
    try {
        if (_id) {
            return await reportModel.find({ "user._id": _id }).sort({ creationDate: -1 })
        }
        return await reportModel.find().sort({ creationDate: -1 })
    } catch (error) {
        return false
    }
}

const deleteReport = async (_id) => {
    try {
        return await reportModel.deleteOne({ _id })
    } catch (error) {
        return false
    }
}

const reportController = {
    createReport,
    getReports,
    deleteReport
}

module.exports = reportController