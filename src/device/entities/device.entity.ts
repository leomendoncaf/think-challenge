import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  local: string;

  @Column({ type: 'text' })
  name: string;

  @ManyToOne(() => User, (user) => user.devices)
  user: User;
}
