const reportModel = require('../models/reportModel')

const createReport = async (report) => await reportModel(report).save()

const getReports = async () => {
    try {
        return await reportModel.find().sort({ creationDate: -1 })
    } catch (error) {
        return false
    }
}

const deleteReport = async (_id) => {
    try {
        return await reportModel.deleteOne({_id})
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