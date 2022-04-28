import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, AfterInsert, AfterRemove } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string

  @Column({ nullable: true, unique: true })
  username?: string

  @Column({ unique: true })
  email: string

  @Column()
  password?: string

  @AfterInsert()
  @AfterRemove()
  hiddenPassword(): void {
    delete this.password
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}
