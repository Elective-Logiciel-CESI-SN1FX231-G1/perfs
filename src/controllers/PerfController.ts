import { Handler } from 'express'

const os = require('os')

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
  await delay(10000)
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
  const perfs = {
    ram: usedRam,
    cpu: usedCpuPercent
  }
  console.log(perfs)
}

setInterval(getPerfs, 10000)

export const getAll: Handler = async (req, res) => {
  res.sendStatus(200)
}

export default {
  getAll
}
