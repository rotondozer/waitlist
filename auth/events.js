'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
// const app = require('../app')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .done(ui.signUpSuccess)
    .fail(ui.fail)
}

const onSignIn = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)
  api.signIn(data)
    .done(ui.signInSuccess)
    .fail(ui.fail)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
    .done(ui.signOutSuccess)
    .fail(ui.fail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .fail(ui.fail)
}

const onCreateDate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // const date = $("input[name='credentials[date-create]']").val()
  // console.log(date)
  api.createDate(data)
    .then(ui.onCreateDateSuccess)
    .catch(ui.fail)
}

const onGetDateMasters = function (event) {
  event.preventDefault()
  console.log('onGetDateMasters in events.js')
  api.getDateMasters()
    .then(ui.getDateMastersSuccess)
    .catch(ui.fail)
}

const onGetFoodLogs = function (event) {
  event.preventDefault()
  console.log('onGetFoodLogs in events.js')
  api.getFoodLogs()
    .then(ui.getFoodLogsSuccess)
    .catch(ui.fail)
}

const onGetAllergicReactionLogs = function (event) {
  event.preventDefault()
  console.log('onGetAllergicReactionLogs in events.js')
  api.getAllergicReactionLogs()
    .then(ui.getAllergicReactionLogsSuccess)
    .catch(ui.fail)
}

const onGetFlByDate = function (event) {
  event.preventDefault()
  // Get input 'yyyy-mm-dd'
  const dateFilter = $('#fl-date-input').val()

  console.log('FL dateFilter === ' + dateFilter)
  console.log('onGetFlByDate in events.js')
  // pass input to API call
  api.getFlByDate(dateFilter)
    .then(ui.getFlByDateSuccess)
    .catch(ui.fail)
}

const onGetArlByDate = function (event) {
  event.preventDefault()
  const dateFilter = $('#arl-date-input').val()

  console.log('ARL dateFilter === ' + dateFilter)
  console.log('onGetFlByDate in events.js')
  // pass input to API call
  api.getArlByDate(dateFilter)
    .then(ui.getArlByDateSuccess)
    .catch(ui.fail)
}

const onCreateFoodLog = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onCreateFoodLog in event.js')
  console.log(data) // returns food_log object
  api.createFoodLog(data)
    .then(ui.createFoodLogSuccess)
    .catch(ui.fail)
}

const onCreateAllergicReactionLog = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onCreateAllergicReactionLog in event.js')
  console.log(data) // returns food_log object
  api.createAllergicReactionLog(data)
    .then(ui.createAllergicReactionLogSuccess)
    .catch(ui.fail)
}

const onUpdateDate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onUpdateDate in events.js')
  console.log(data)
  api.updateDate(data)
    .then(ui.updateDateSuccess)
    .catch(ui.fail)
}

const onDeleteDate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.deleteDate(data)
    .then(ui.onDeleteDateSuccess)
    .catch(ui.fail)
}

const onSignUpPrompt = function () {
  $(this).hide()
  $('#sign-up').show()
}

const emptyInputVals = function (event) {
  event.preventDefault()
  $('input').val('')
}

const showMyAcct = function () {
  if ($(this).hasClass('disabled')) {
    return
  } else {
    $('.page-2').hide()
    $('.my-acct').show()
    $("button[name='my-acct']").hide()
    $("button[name='main']").show()
  }
}

const closeMyAcct = function () {
  $('.my-acct').hide()
  $(".page-2, button[name='my-acct']").show()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#get-all-food-logs').on('click', onGetFoodLogs)
  $('#get-all-date-masters').on('click', onGetDateMasters)
  $('#get-food-by-date').on('submit', onGetFlByDate)
  $('#get-allergic-reactions-by-date').on('submit', onGetArlByDate)
  $('#create-date').on('submit', onCreateDate)
  $('#create-food-log').on('submit', onCreateFoodLog)
  $('#create-allergic-reaction-log').on('submit', onCreateAllergicReactionLog)
  $('#update-date').on('submit', onUpdateDate)
  $('#delete-date').on('submit', onDeleteDate)
  $('#get-all-allergic-reaction-logs').on('submit', onGetAllergicReactionLogs)
  $('.sign-up-prompt').on('click', onSignUpPrompt)
  $('form').on('submit', emptyInputVals)
  $("button[name='my-acct']").on('click', showMyAcct)
  $("button[name='main']").on('click', closeMyAcct)
}

module.exports = {
  addHandlers
}
