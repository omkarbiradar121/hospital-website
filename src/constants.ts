import { Doctor, Department, BlogEntry, LabTest } from './types.ts';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Specialized care for heart and circulatory system disorders.',
    icon: 'HeartPulse',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Expert treatment for brain, spine, and nerve disorders.',
    icon: 'Brain',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Comprehensive care for musculoskeletal system and bones.',
    icon: 'Bone',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Dedicated healthcare for infants, children, and adolescents.',
    icon: 'Baby',
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    description: 'Primary care and non-surgical treatment for internal diseases.',
    icon: 'Stethoscope',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-madiha-kazi',
    name: 'Dr. Madiha Kazi',
    qualification: 'MD, FRCP (Chief Medical Officer)',
    specialization: 'Internal Medicine & Hospital Management',
    experience: '15+ Years',
    availability: 'Mon - Fri, 10:00 AM - 02:00 PM',
    image: 'https://picsum.photos/seed/doctor1/400/500',
    bio: 'Founder and visionary behind Kazi Hospital, focusing on patient-centric care models and medical excellence.',
  },
  {
    id: 'dr-john-doe',
    name: 'Dr. John Doe',
    qualification: 'MD, PhD Cardiology',
    specialization: 'Cardiology',
    experience: '12 Years',
    availability: 'Tue - Sat, 09:00 AM - 01:00 PM',
    image: 'https://picsum.photos/seed/doctor2/400/500',
    bio: 'Specialist in interventional cardiology and structural heart diseases.',
  },
  {
    id: 'dr-sarah-smith',
    name: 'Dr. Sarah Smith',
    qualification: 'MBBS, MD Pediatrics',
    specialization: 'Pediatrics',
    experience: '8 Years',
    availability: 'Mon - Thu, 02:00 PM - 06:00 PM',
    image: 'https://picsum.photos/seed/doctor3/400/500',
    bio: 'Expert in pediatric intensive care and neonatal development.',
  },
];

export const BLOG_POSTS: BlogEntry[] = [
  {
    id: '1',
    title: 'New Emergency protocols for Cardiac patients',
    excerpt: 'Implementing faster response times for structural heart diseases in the emergency wing.',
    date: 'April 15, 2026',
    category: 'Innovation',
    image: 'https://picsum.photos/seed/blog1/800/400',
  },
  {
    id: '2',
    title: 'Protecting your health in the digital age',
    excerpt: 'Dr. Kazi shares insights on maintaining a healthy lifestyle while working remotely.',
    date: 'April 10, 2026',
    category: 'Wellness',
    image: 'https://picsum.photos/seed/blog2/800/400',
  },
];

export const LAB_TESTS: LabTest[] = [
  { id: 'mri', name: 'MRI (Magnetic Resonance Imaging)', description: 'Full body scan for internal structures.', price: '$450', category: 'Radiology' },
  { id: 'ct', name: 'CT Scan', description: 'Advanced X-ray for detailed imaging.', price: '$350', category: 'Radiology' },
  { id: 'blood', name: 'Complete Blood Count (CBC)', description: 'Standard analysis of blood components.', price: '$45', category: 'Pathology' },
  { id: 'xray', name: 'Chest X-ray', description: 'Quick screening for thoracic issues.', price: '$85', category: 'Radiology' },
];
