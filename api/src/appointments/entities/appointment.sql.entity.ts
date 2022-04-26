
import OfficeSQL from 'src/offices/entities/office.sql.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class AppointmentSQL {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 25 })
  public title: string;

  @Column({ type: 'varchar', length: 120 })
  public description: string;

  @Column({ type: 'varchar', length: 40 })
  public modules: string;

  @Column({ type: 'timestamp' })
  public date!: Date;

  @ManyToOne(() => OfficeSQL, (office: OfficeSQL) => office.appointments)
  public office: OfficeSQL;
  
  @Column({ type: 'varchar' })
  public uuid: string;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}