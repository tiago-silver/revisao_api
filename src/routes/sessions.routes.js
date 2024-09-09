const { Router } = require("express") ;

const SessionsConstroller = require("../controller/SessionsController")


const sessionsController = new SessionsConstroller()

const sessionsRoutes = Router() 

sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes