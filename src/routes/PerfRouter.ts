import express from 'express'
import PerfController from '../controllers/PerfController'
const PerfRouter = express.Router()

PerfRouter.get('/', PerfController.getAll)

export default PerfRouter
