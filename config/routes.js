var async = require('async')

module.exports = function (app, passport, auth) {

    //Purchase webhooks
    var credits = require('../app/controllers/credits')
    app.post('/credits/buy', credits.buy)

    var purchases = require('../app/controllers/purchase')
    app.post('/purchases/buy', purchases.buy)
    app.post('/purchases/confirm', purchases.confirm)

    // user routes
    var users = require('../app/controllers/users')
    app.get('/signin', users.signin)
    app.get('/signup', users.signup)
    app.get('/signout', users.signout)
    app.post('/users', users.create)
    app.get('/users/verifyemail', users.verifyemail)
    app.post('/users/verifyphone', users.verifyphone)
    app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
    app.get('/users/me', users.me)
    app.get('/users/show', users.show)
    app.get('/users/:userId', users.show)
    app.put('/users/:userId', auth.requiresLogin, users.update)


    app.param('userId', users.user)


    //    // Incoming/Outgoing routes for messages
    //    var messages = require('../app/controllers/messages')
    //    app.get('/messages/receive', messages.receive)
    //
    // event routes
    var events = require('../app/controllers/events')
    app.get('/events', events.all)
    app.post('/events', auth.requiresLogin, events.create)
    app.get('/events/:eventId', events.show)
    app.put('/events/:eventId', auth.requiresLogin, events.update)
    app.del('/events/:eventId', auth.requiresLogin, events.destroy)

    app.param('eventId', events.event)

    // eventinstance routes
    var eventinstances = require('../app/controllers/eventinstances')
    app.get('/eventinstances',auth.requiresLogin, eventinstances.all)
    //app.get('/eventinstances/event/:eventId',auth.requiresLogin, eventinstances.eventdates)
    app.post('/eventinstances', auth.requiresLogin, eventinstances.create)
    app.get('/eventinstances/:eventinstanceId', eventinstances.show)
    app.put('/eventinstances/:eventinstanceId', auth.requiresLogin, eventinstances.update)
    app.del('/eventinstances/:eventinstanceId', auth.requiresLogin, eventinstances.destroy)

    app.param('eventinstanceId', eventinstances.eventinstance)

    //    var locations = require('../app/controllers/locations')
    //    app.get('/locations', locations.all)
    //    app.post('/locations', auth.requiresLogin, locations.create)
    //    app.get('/locations/:locationId', locations.show)
    //    app.put('/locations/:locationId', auth.requiresLogin, locations.update)
    //    app.del('/locations/:locationId', auth.requiresLogin, locations.destroy)

    //    app.param('locationId', locations.location)


    var messages = require('../app/controllers/messages')
    app.get('/messages',auth.requiresLogin, messages.all)
    app.get('/messages/receive',auth.requiresLogin, messages.receive)
    app.post('/messages', auth.requiresLogin, messages.create)
    app.get('/messages/:messageId', messages.show)
    app.put('/messages/:messageId', auth.requiresLogin, messages.update)
    app.del('/messages/:messageId', auth.requiresLogin, messages.destroy)

    app.param('messageId', messages.message)


    // team routes
    var teams = require('../app/controllers/teams')
    app.get('/teams',auth.requiresLogin, teams.all)
    app.post('/teams', auth.requiresLogin, teams.create)
    app.get('/teams/:teamId',auth.requiresLogin, teams.show)
    app.put('/teams/:teamId', auth.requiresLogin, teams.update)
    app.del('/teams/:teamId', auth.requiresLogin, teams.destroy)

    app.param('teamId', teams.team)

    // player routes
    var players = require('../app/controllers/players')
    app.get('/players',auth.requiresLogin, players.all)
    app.post('/players', auth.requiresLogin, players.create)
    app.get('/players/:playerId', auth.requiresLogin, players.show)
    app.put('/players/:playerId', auth.requiresLogin, players.update)
    app.del('/players/:playerId', auth.requiresLogin, players.destroy)

    app.param('playerId', players.player)


    // home route
    var index = require('../app/controllers/index')
    app.get('/', index.render)

}
