export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Pet {
  id?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  userId: string;
  user?: User;
}

export interface Veterinarian {
  id?: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'canceled';

export interface Appointment {
  id?: string;
  dateTime: Date;
  petId: string;
  veterinarianId: string;
  status: AppointmentStatus;
  pet?: Pet;
  veterinarian?: Veterinarian;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    appointment: Appointment;
  };
}
