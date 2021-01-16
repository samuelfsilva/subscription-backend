import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscription')
export default class Subscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name:string;

  @Column()
  email:string;

  @Column('date')
  nascimento:Date;
}