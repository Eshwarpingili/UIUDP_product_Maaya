import { addDays, subDays } from "date-fns"
import { AlertItem, Appointment, HealthMetric, ReportItem } from "@/types"

const today = new Date()

export const mockReports: ReportItem[] = [
  {
    id: "r1",
    title: "Ultrasound Week 20",
    date: subDays(today, 7).toISOString(),
    location: "Lotus Diagnostics",
    summary: "Fetal growth on track. Placenta posterior. Normal amniotic fluid.",
    status: "stable",
    description:
      "Baby development is progressing well. No anomalies detected. Continue iron supplements and hydration.",
    medicines: ["Iron tablets", "Calcium"],
    lifestyle: ["Continue daily walk", "Sleep on left side"],
    images: ["/mock/report-1.svg", "/mock/report-2.svg", "/mock/report-3.svg"]
  },
  {
    id: "r2",
    title: "Blood Work Panel",
    date: subDays(today, 25).toISOString(),
    location: "GreenCross Clinic",
    summary: "Hemoglobin slightly low. Vitamin D improved.",
    status: "followup",
    description:
      "Mild anemia noted. Increase iron-rich foods and keep supplements consistent. Follow up in 4 weeks.",
    medicines: ["Iron tablets"],
    lifestyle: ["Add spinach, lentils", "Rest after meals"],
    images: ["/mock/report-4.svg", "/mock/report-5.svg"]
  },
  {
    id: "r3",
    title: "Glucose Challenge Test",
    date: subDays(today, 40).toISOString(),
    location: "City Hospital",
    summary: "Glucose within target range. Continue balanced diet.",
    status: "stable",
    description: "All values are within normal ranges. Continue routine checkups.",
    medicines: ["Prenatal vitamins"],
    lifestyle: ["Maintain balanced meals", "Stay hydrated"],
    images: ["/mock/report-6.svg"]
  }
]

export const mockHealthData: HealthMetric[] = [
  {
    id: "h1",
    label: "Blood Pressure",
    unit: "mmHg",
    value: 112,
    trend: "flat",
    data: [
      { name: "Mon", value: 110 },
      { name: "Tue", value: 111 },
      { name: "Wed", value: 112 },
      { name: "Thu", value: 113 },
      { name: "Fri", value: 112 },
      { name: "Sat", value: 112 },
      { name: "Sun", value: 112 }
    ]
  },
  {
    id: "h2",
    label: "Steps",
    unit: "steps",
    value: 6400,
    trend: "up",
    data: [
      { name: "Mon", value: 5200 },
      { name: "Tue", value: 6000 },
      { name: "Wed", value: 5800 },
      { name: "Thu", value: 6500 },
      { name: "Fri", value: 7000 },
      { name: "Sat", value: 6800 },
      { name: "Sun", value: 6400 }
    ]
  },
  {
    id: "h3",
    label: "Heart Rate",
    unit: "bpm",
    value: 82,
    trend: "up",
    data: [
      { name: "Mon", value: 78 },
      { name: "Tue", value: 80 },
      { name: "Wed", value: 81 },
      { name: "Thu", value: 83 },
      { name: "Fri", value: 84 },
      { name: "Sat", value: 82 },
      { name: "Sun", value: 82 }
    ]
  },
  {
    id: "h4",
    label: "Oxygen",
    unit: "%",
    value: 98,
    trend: "flat",
    data: [
      { name: "Mon", value: 97 },
      { name: "Tue", value: 98 },
      { name: "Wed", value: 98 },
      { name: "Thu", value: 99 },
      { name: "Fri", value: 98 },
      { name: "Sat", value: 98 },
      { name: "Sun", value: 98 }
    ]
  }
]

export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    hospital: "Sunrise Women Care",
    doctor: "Dr. Mira Nair",
    date: addDays(today, 6).toISOString(),
    time: "10:30 AM",
    status: "Scheduled"
  },
  {
    id: "a2",
    hospital: "Lotus Diagnostics",
    doctor: "Dr. Anil Rao",
    date: addDays(today, 18).toISOString(),
    time: "02:00 PM",
    status: "Scheduled"
  }
]

export const mockAlerts: AlertItem[] = [
  {
    id: "al1",
    title: "Hydration",
    description: "You are 2 glasses short of today’s water goal.",
    level: "yellow"
  },
  {
    id: "al2",
    title: "Blood Pressure",
    description: "Latest reading within your safe range.",
    level: "green"
  },
  {
    id: "al3",
    title: "Low Iron",
    description: "Continue supplements and iron-rich meals.",
    level: "red"
  }
]
