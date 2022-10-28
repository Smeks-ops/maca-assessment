import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file-upload')
export class FileUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ type: 'varchar', length: 300, nullable: false })
  date: string; 

  @Column({ type: 'varchar', length: 300, nullable: false })
  fileURL: string;

  @Column({ type: 'varchar', nullable: true, length: 300 })
  amount: string;

  @Column({ type: 'varchar', nullable: true, length: 300 })
  purchaseName: string;

  @Column({ type: 'varchar', nullable: true, length: 300 })
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
