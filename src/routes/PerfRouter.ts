import express from 'express'
import paginate from '../../utils/pagination'
import { restrictedToRoles } from '../auth'
import PerfController from '../controllers/PerfController'
const PerfRouter = express.Router()

PerfRouter.get('/', restrictedToRoles('technician'), paginate, PerfController.getAll)

export default PerfRouter
