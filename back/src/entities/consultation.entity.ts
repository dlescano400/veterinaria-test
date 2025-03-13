import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Appointment } from "./appointment.entity";
import { Invoice } from "./invoice.entity";

@Entity()
export class Consultation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Appointment, appointment => appointment.consultation)
  @JoinColumn()
  appointment: Appointment;

  @Column("text")
  diagnosis: string;

  @Column("text")
  treatment: string;

  @Column("decimal", { precision: 10, scale: 2 })
  cost: number;

  @OneToOne(() => Invoice, invoice => invoice.consultation)
  invoice: Invoice;
}