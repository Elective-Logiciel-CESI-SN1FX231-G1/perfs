import express from 'express'
import 'express-async-errors'
import { auth } from './auth'
import PerfRouter from './routes/PerfRouter'

const app = express()

app.use(auth)
app.use('/api', express.static('apidoc'))
app.use('/api/perfs', PerfRouter)

export default app
