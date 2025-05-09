import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Veterinarian } from "./veterinarian.entity";
import { Consultation } from "./consultation.entity";

export type AppointmentStatus = "pending" | "confirmed" | "canceled";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  dateTime: Date;

  @ManyToOne(() => Pet, (pet) => pet.appointments)
  pet: Pet;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.appointments)
  veterinarian: Veterinarian;

  @Column({
    type: "text",
    nullable: false,
    default: "pending",
  })
  status: AppointmentStatus;

  @OneToOne(() => Consultation, (consultation) => consultation.appointment)
  consultation: Consultation;
}
