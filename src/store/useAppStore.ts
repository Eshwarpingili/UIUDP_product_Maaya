import { create } from "zustand"
import { addDays } from "date-fns"
import {
  AlertItem,
  Appointment,
  HealthMetric,
  NotificationItem,
  PregnancyData,
  ReportItem,
  UserRole
} from "@/types"
import { mockAlerts, mockAppointments, mockHealthData, mockReports } from "@/data/mock"

type AppState = {
  userRole: UserRole
  pregnancyData: PregnancyData
  reports: ReportItem[]
  healthData: HealthMetric[]
  appointments: Appointment[]
  alerts: AlertItem[]
  notifications: NotificationItem[]
  setUserRole: (role: UserRole) => void
  updatePregnancyData: (data: Partial<PregnancyData>) => void
  addReport: (report: ReportItem) => void
  addAppointment: (appointment: Appointment) => void
  deleteReport: (id: string) => void
}

const today = new Date()

const initialPregnancy: PregnancyData = {
  name: "Aarohi",
  age: 28,
  dueDate: addDays(today, 130).toISOString(),
  pregnancyType: "Singleton",
  conditions: ["Mild anemia"],
  lifestyle: "Walks daily, prenatal yoga",
  supportInvite: "ABCD-2026",
  permissions: ["Share reports", "Share appointments"]
}

export const useAppStore = create<AppState>((set) => ({
  userRole: "mother",
  pregnancyData: initialPregnancy,
  reports: mockReports,
  healthData: mockHealthData,
  appointments: mockAppointments,
  alerts: mockAlerts,
  notifications: [
    { id: "n1", title: "Hydration reminder", time: "08:00 AM" },
    { id: "n2", title: "New report ready", time: "Yesterday" }
  ],
  setUserRole: (role) => set({ userRole: role }),
  updatePregnancyData: (data) =>
    set((state) => ({ pregnancyData: { ...state.pregnancyData, ...data } })),
  addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [appointment, ...state.appointments] })),
  deleteReport: (id) =>
    set((state) => ({ reports: state.reports.filter((report) => report.id !== id) }))
}))
