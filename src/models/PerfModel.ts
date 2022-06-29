import { Schema, model } from 'mongoose'

export interface IPerf {
  cpu: Number,
  ram: Number,
  service_id: String,
  date: Date
}

export const rawPerfSchema = {
  cpu: { type: Number, required: true },
  ram: { type: Number, required: true },
  service_id: { type: String, required: true },
  date: { type: Date, required: true }
}

const PerfSchema = new Schema<IPerf>(rawPerfSchema).index({ service_id: 1, date: 1 }, { unique: true })

export default model('Perf', PerfSchema)
