import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./appointment.entity";

@Entity()
export class Veterinarian {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable: true})
  specialty: string;

  @Column()
  phone: string;

  @OneToMany(() => Appointment, appointment => appointment.veterinarian)
  appointments: Appointment[];
}
