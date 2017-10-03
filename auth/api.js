'use strict'

const app = require('./app')
const getFormFields = require('../../../lib/get-form-fields.js')

// authApi.signUp(authUi.success, authUi.failure, data)
const signUp = function (data) {
  return $.ajax({
    url: app.host + '/sign-up/',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: app.host + '/sign-in/',
    method: 'POST',
    data
  })
}

const signOut = function () {
  return $.ajax({
    method: 'DELETE',
    url: app.host + '/sign-out/' + app.user.id,
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

const changePassword = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: app.host + '/change-password/' + app.user.id,
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data: data
  })
}

const createDate = function (data) {
  console.log(data)
  return $.ajax({
    url: app.host + '/users/' + app.user.id + '/date_masters',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data
  })
}

const updateDate = function (data) {
  console.log('updateDate in api.js')
  console.log(data.date_master.date_old)
  const oldDate = data.date_master.date_old
  return $.ajax({
    method: 'PATCH',
    url: app.host + '/users/' + app.user.id + '/date_masters/' + oldDate,
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data: data
  })
}

const getDateMasters = function (data) {
  console.log('getDateMasters in api.js')
  return $.ajax({
    method: 'GET',
    url: app.host + '/date_masters/' + app.user.id,
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

const getFoodLogs = function () {
  console.log('getFoodLogs')
  return $.ajax({
    method: 'GET',
    url: app.host + '/food_logs/' + app.user.id,
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

const getAllergicReactionLogs = function () {
  console.log('getAllergicReactionLogs in api.js')
  return $.ajax({
    method: 'GET',
    url: app.host + '/allergic_reaction_logs/' + app.user.id,
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

const getFlByDate = function (data) {
  console.log('getFlByDate data === ' + data)
  return $.ajax({
    method: 'GET',
    // url: /date_masters/:date_master_id/food_logs(.:format)
    url: app.host + '/users/' + app.user.id + '/date_masters/' + data + '/food_logs',
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

const getArlByDate = function (data) {
  console.log('getArlByDate data === ' + data)
  return $.ajax({
    method: 'GET',
    // url: /date_masters/:date_master_id/food_logs(.:format)
    url: app.host + '/users/' + app.user.id + '/date_masters/' + data + '/allergic_reaction_logs',
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

const createFoodLog = function (data) {
  console.log('createFoodLog in api.js')
  console.log(data.food_log.date_master_id)
  // date to be converted to date_master_id
  const date = data.food_log.date_master_id
  return $.ajax({
    method: 'POST',
    url: app.host + '/users/' + app.user.id + '/date_masters/' + date + '/food_logs',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data
  })
}

const createAllergicReactionLog = function (data) {
  console.log('createAllergicReactionLog in api.js')
  console.log(data.allergic_reaction_log.date_master_id)
  // date to be converted to date_master_id
  const date = data.allergic_reaction_log.date_master_id
  return $.ajax({
    method: 'POST',
    url: app.host + '/users/' + app.user.id + '/date_masters/' + date + '/allergic_reaction_logs',
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
    data
  })
}

const deleteDate = function (data) {
  console.log(data)
  const date = data.date_master.date
  console.log(date)
  return $.ajax({
    url: app.host + '/users/' + app.user.id + '/date_masters/' + date,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  getFoodLogs,
  getAllergicReactionLogs,
  getDateMasters,
  getFlByDate,
  getArlByDate,
  getFormFields,
  createDate,
  updateDate,
  deleteDate,
  createFoodLog,
  createAllergicReactionLog
}
