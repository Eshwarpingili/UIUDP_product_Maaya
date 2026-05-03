export type UserRole = "mother" | "support"

export type PregnancyData = {
  name: string
  age: number
  dueDate: string
  pregnancyType: string
  conditions: string[]
  lifestyle: string
  supportInvite: string
  permissions: string[]
}

export type ReportItem = {
  id: string
  title: string
  date: string
  location: string
  summary: string
  status: "stable" | "followup" | "critical"
  description: string
  medicines: string[]
  lifestyle: string[]
  images: string[]
}

export type HealthMetric = {
  id: string
  label: string
  unit: string
  value: number
  trend: "up" | "down" | "flat"
  data: { name: string; value: number }[]
}

export type Appointment = {
  id: string
  hospital: string
  doctor: string
  date: string
  time: string
  status: string
}

export type AlertItem = {
  id: string
  title: string
  description: string
  level: "green" | "yellow" | "red"
}

export type NotificationItem = {
  id: string
  title: string
  time: string
}
