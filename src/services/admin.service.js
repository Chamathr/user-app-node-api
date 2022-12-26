const AdminRepository = require('../repositories/admin.repository')
const EmailServiceConfig = require('../config/emailService.config')
const axios =require('axios')

const emailServiceBaseUrl = EmailServiceConfig?.EMAIL_SERVICE_BASE_URL
const emailServicePrefix = EmailServiceConfig?.EMAIL_SERVICE_PREFIX
const emailServiceEmailTemplate = EmailServiceConfig?.EMAIL_SERVICE_EMAIL_TEMPLATE
const emailServiceFromEmail = EmailServiceConfig?.EMAIL_SERVICE_FROM_EMAIL

const getAllUsers = async () => {
    try {
        const response = await AdminRepository.getAllUsers()
        return response
    }
    catch (error) {
        throw error
    }
}

const getUserById = async (userEmail) => {
    try {
        const response = await AdminRepository.getUserById(userEmail)
        return response
    }
    catch (error) {
        throw error
    }
}

const resetUserPassword = async (userEmail) => {
    try {
        const response = await AdminRepository.resetUserPassword(userEmail)

        if (response?.newPassword) {
            const emailApiBody = {
                fromEmail: emailServiceFromEmail,
                toEmail: userEmail,
                content: `successfully reset the password. You new password is ${response?.newPassword}`,
                emailTemplateName: emailServiceEmailTemplate
            }
            const axiosResponse = await axios.post(`${emailServiceBaseUrl}/${emailServicePrefix}/email/send-email`, emailApiBody)
            return axiosResponse?.data 
        }
        else{
            return response?.responseBody
        }
    }
    catch (error) {
        throw error
    }
}

const changeUserStatus = async (userEmail, userStatus) => {
    try {
        const response = await AdminRepository.changeUserStatus(userEmail, userStatus)
        return response
    }
    catch (error) {
        throw error
    }
}

const deleteUser = async (userEmail) => {
    try {
        const response = await AdminRepository.deleteUser(userEmail)
        return response
    }
    catch (error) {
        throw error
    }
}

const deleteUserPermanent = async (userEmail) => {
    try {
        const response = await AdminRepository.deleteUserPermanent(userEmail)
        return response
    }
    catch (error) {
        throw error
    }
}

module.exports = { getAllUsers, getUserById, resetUserPassword, deleteUser, deleteUserPermanent, changeUserStatus }