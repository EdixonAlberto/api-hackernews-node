import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  post_id?: string

  @Column()
  month: string

  @Column()
  created_at: string

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  url: string

  @Column()
  author: string

  @Column({ nullable: true })
  points: number

  @Column({ nullable: true })
  story_text: string

  @Column({ nullable: true })
  comment_text: string

  @Column({ nullable: true })
  num_comments: number

  @Column({ nullable: true })
  story_id: number

  @Column({ nullable: true })
  story_title: string

  @Column({ nullable: true })
  story_url: string

  @Column({ nullable: true })
  parent_id: number

  @Column({ nullable: true })
  created_at_i: number

  @Column()
  tag: string

  @Column({ unique: true })
  objectID: string
}
