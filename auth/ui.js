'use strict'

const app = require('../app.js')

const signInSuccess = (data) => {
  app.user = data.user
  console.log('sign in success!')
  $('#sign-up, #sign-in, .sign-up-prompt, .sign-in-prompt').hide()
  $('.page-2').show()
  $("button[name='my-acct']").removeClass('disabled')
}

const signOutSuccess = () => {
  app.user = null
  // console.log(app)
  // console.log('signed out')
  $(".page-2, .my-acct, #sign-up, button[name='main']").hide()
  $('#sign-in, .sign-up-prompt, .sign-in-prompt').show()
}

const changePasswordSuccess = () => {
  // console.log('Password Successfully Changed.')
}

const onCreateDateSuccess = (data) => {
  console.log(data.date_master)
  // TODO This can be used to pass the date_master_id without searching database
  app.date_master = data.date_master
  app.date_master.id = data.date_master.id
}

const onUpdateDateSuccess = (data) => {
  // console.log(data)
}

const onDeleteDateSuccess = (data) => {
  // console.log(data)
}

const getDateMastersSuccess = (data) => {
  $('.date-master-date').html('')
  const date = data.date_masters
  if (date.length > 0) {
    for (let i = 0; i < date.length; i++) {
      $('.date-master-date').append('<div>' + date[i].date + '</div>')
    }
  } else {
    $('.user-message').append('<div>Looks like you haven\'t initialized any logs yet</div>')
  }
}

const getFoodLogsSuccess = (data) => {
  $('.food-description, .food-time, .food-date').html('')
  if (data.food_logs.length > 0) {
    for (let i = 0; i < data.food_logs.length; i++) {
      $('.food-description').append('<div>' + data.food_logs[i].description + '</div>')
      $('.food-time').append('<div>' + data.food_logs[i].time + '</div>')
      $('.food-date').append('<div>' + data.food_logs[i].date_master.date + '</div>')
    }
  } else {
    $('.user-message').append('<div>Looks like you haven\'t made any food logs yet</div>')
  }
}

const getAllergicReactionLogsSuccess = (data) => {
  $('.reaction-symptom, .reaction-time, .reaction-date').html('')
  const ARLogs = data.allergic_reaction_logs
  if (ARLogs.length > 0) {
    for (let i = 0; i < ARLogs.length; i++) {
      $('.reaction-symptom').append('<div>' + ARLogs[i].symptom + '</div>')
      $('.reaction-time').append('<div>' + ARLogs[i].time + '</div>')
      $('.reaction-date').append('<div>' + ARLogs[i].date_master.date + '</div>')
    }
  } else {
    $('.user-message').append('<div>Looks like you haven\'t made any allergy logs yet</div>')
  }
}

const getFlByDateSuccess = (data) => {
  $('.food-description, .food-date, .food-time').html('')
  const foodLogs = data.food_logs
  if (foodLogs.length > 0) {
    for (let i = 0; i < foodLogs.length; i++) {
      $('.food-description').append('<div>' + foodLogs[i].description + '</div>')
      $('.food-time').append('<div>' + foodLogs[i].time + '</div>')
      $('.food-date').append('<div>' + foodLogs[i].date_master.date + '</div>')
    }
  } else {
    $('.user-message').append('<div>Looks like you haven\'t made any logs yet</div>')
  }
}

const getArlByDateSuccess = (data) => {
  $('.reaction-symptom, .reaction-time, .reaction-date').html('')
  const ARLogs = data.allergic_reaction_logs
  if (ARLogs.length > 0) {
    for (let i = 0; i < ARLogs.length; i++) {
      $('.reaction-symptom').append('<div>' + ARLogs[i].symptom + '</div>')
      $('.reaction-time').append('<div>' + ARLogs[i].time + '</div>')
      $('.reaction-date').append('<div>' + ARLogs[i].date_master.date + '</div>')
    }
  } else {
    $('.user-message').append('<div>Looks like you haven\'t made any logs yet</div>')
  }
}

const createFoodLogSuccess = (data) => {
  // console.log(data)
}

const createAllergicReactionLogSuccess = (data) => {
  // console.table(data)
}

const signUpSuccess = (data) => {
  $('#sign-up').hide()
  // console.log(data)
}

const success = (data) => {
  // console.log(data)
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  getFoodLogsSuccess,
  getAllergicReactionLogsSuccess,
  getDateMastersSuccess,
  getFlByDateSuccess,
  getArlByDateSuccess,
  signUpSuccess,
  onCreateDateSuccess,
  onUpdateDateSuccess,
  onDeleteDateSuccess,
  createFoodLogSuccess,
  createAllergicReactionLogSuccess
}
