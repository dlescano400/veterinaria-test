import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Appointment } from "./appointment.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.pets)
  user: User;

  @OneToMany(() => Appointment, appointment => appointment.pet)
  appointments: Appointment[];
}