import { Handler } from 'express'
import shortid from 'shortid'
import PerfModel from '../models/PerfModel'
const os = require('os')

const uniqueID = shortid.generate()
const timeBetweenMeasures = 60000

// Create function to get CPU information
const cpuAverage = function () {
  // Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0; let totalTick = 0
  const cpus = os.cpus()

  // Loop through CPU cores
  for (let i = 0, len = cpus.length; i < len; i++) {
    // Select CPU core
    const cpu = cpus[i]

    // Total up the time in the cores tick
    for (const type in cpu.times) {
      totalTick += cpu.times[type]
    }

    // Total up the idle time of the core
    totalIdle += cpu.times.idle
  }

  // Return the average Idle and Tick times
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length }
}

const getCpuAverage = async function () {
// Grab first CPU Measure
  const startMeasure = cpuAverage()

  const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
  await delay(timeBetweenMeasures)
  // Grab second Measure
  const endMeasure = cpuAverage()

  // Calculate the difference in idle and total time between the measures
  const idleDifference = endMeasure.idle - startMeasure.idle
  const totalDifference = endMeasure.total - startMeasure.total

  // Calculate the average percentage CPU usage
  const percentageCPU = 100 - ~~(100 * idleDifference / totalDifference)

  // Output result to console
  return (percentageCPU)
}

const getPerfs = async function () {
  const usedRam1 = os.totalmem() - os.freemem()
  const usedCpuPercent = await getCpuAverage()
  const usedRam2 = os.totalmem() - os.freemem()
  const usedRam = (usedRam1 + usedRam2) / (2)
  const dateNow = new Date(Date.now())
  dateNow.setMilliseconds(0)
  dateNow.setSeconds(0)
  const perfs = {
    ram: usedRam,
    cpu: usedCpuPercent,
    service_id: uniqueID,
    date: dateNow
  }
  const perfsDB = new PerfModel(perfs)
  perfsDB.save()
}

setInterval(getPerfs, timeBetweenMeasures)

export const getAll: Handler = async (req, res) => {
  // res.send
  const perfes = await PerfModel.find()
  if (!perfes) return res.sendStatus(401)
  return res.send(perfes)
}

export default {
  getAll
}
