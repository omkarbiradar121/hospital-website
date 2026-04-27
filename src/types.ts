export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  availability: string;
  image: string;
  bio: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Appointment {
  doctorId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  timeSlot: string;
  symptoms: string;
}

export interface BlogEntry {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}
