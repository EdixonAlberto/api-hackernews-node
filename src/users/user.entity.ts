import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string

  @Column({ default: '', unique: true })
  username?: string

  @Column({ default: false, unique: true })
  email: string

  @Column({ default: false })
  password: string
}
