'use strict'
var $ = require('jquery')
const app = require('./app')

// authApi.signUp(authUi.success, authUi.failure, data)
const signUp = function (email, password, pwConfirm) {
  return $.ajax({
    url: app.host + '/sign-up/',
    method: 'POST',
    data: {
      'credentials': {
        'email': email,
        'password': password,
        'password_confirmation': pwConfirm
      }
    }
  })
}

const signIn = function (email, password) {
  return $.ajax({
    url: app.host + '/sign-in/',
    method: 'POST',
    data: {
      'credentials': {
        'email': email,
        'password': password
      }
    }
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

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
