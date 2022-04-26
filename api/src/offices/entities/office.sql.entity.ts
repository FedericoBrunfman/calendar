import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentSQL } from 'src/appointments/entities/appointment.sql.entity';
 
@Entity()
class OfficeSQL {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
 
  @Column()
  public subsidiary: string;
 
  @OneToMany(() => AppointmentSQL, (appointment: AppointmentSQL) => appointment.office)
  public appointments: Appointment[];
}
 
export default OfficeSQL;