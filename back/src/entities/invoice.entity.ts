import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Consultation } from "./consultation.entity";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Consultation, consultation => consultation.invoice)
  @JoinColumn()
  consultation: Consultation;

  @CreateDateColumn()
  issueDate: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;
}
