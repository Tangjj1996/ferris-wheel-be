import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  openid: string;

  @Column()
  username: string;

  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column()
  avatar: string;
}
