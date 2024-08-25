import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserDashboardConfig } from '@/user/entities/UserDashboardConfig.entity';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  openid: string;

  @Column({ nullable: true })
  username: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @OneToMany(() => UserDashboardConfig, (config) => config.auth, {
    cascade: true,
  })
  userDashboardConfig: UserDashboardConfig[];
}
