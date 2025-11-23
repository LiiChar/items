import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Items {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
