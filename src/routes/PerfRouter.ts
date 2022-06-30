import express from 'express'
import paginate from '../../utils/pagination'
import { restrictedToRoles } from '../auth'
import PerfController from '../controllers/PerfController'
const PerfRouter = express.Router()

/**
 * @api {get} /perfs/api/perfs/ Request perfs information
 * @apiName GetAll
 * @apiGroup Perf
 *
 * @apiQuery {Number} size=10 Number of elements per page.
 * @apiQuery {Number} skip=0 Number of elements to skip.
 * @apiQuery {Number} page=1 The page to get.
 * @apiQuery {Date} from Starting date.
 * @apiQuery {Date} to End date.
 *
 * @apiSuccess {Number} count Number of products returned.
 * @apiSuccess {Array} results Array of products.
 * @apiSuccess {String} results._id Perfs' unique ID.
 * @apiSuccess {Number} results.cpu CPU usage in percent.
 * @apiSuccess {Number} results.ram RAM usage in bytes.
 * @apiSuccess {String} results.service_id ID of the instance.
 * @apiSuccess {Date} results.date Date and time of the measure.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "count": "1",
 *      "results": [
 *          {
 *              "_id": "62bd6736fd33cb7188827005"
 *              "cpu": 14,
 *              "ram": 13801033728,
 *              "service_id": "pFT1e0e98",
 *              "date": "2022-06-27T09:04:00.000+00:00",
 *          }
 *      ]
 *    }
 */
PerfRouter.get('/', restrictedToRoles('technician'), paginate, PerfController.getAll)

export default PerfRouter
