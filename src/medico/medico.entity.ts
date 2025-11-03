import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'medicos_asociados_medico' })
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500, nullable: true })
  nombres: string;

  @Column({ length: 500, nullable: true })
  apellidos: string;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  activo: number;

  @Column({ length: 50, nullable: true })
  telefono1: string;

  @Column({ length: 50, nullable: true })
  telefono2: string;

  @Column({ length: 10 })
  tipodoc: string;

  @Column({ length: 20 })
  nrodocumento: string;

  @Column({ nullable: true })
  check_termino: number;

  @Column({ nullable: true })
  check_datos: number;

  @Column({ nullable: true })
  check_cookie: number;

  @Column({ type: 'char', length: 50, nullable: false, default: 'TEMP-GOOGLE-CODE' })
  google_code: string; // 👈 el que te causaba error

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()', // 👈 genera la fecha actual en SQL Server
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()', // 👈 inicializa también updated_at al crear
    onUpdate: 'GETDATE()',      // 👈 y se actualiza automáticamente al hacer UPDATE
  })
  updated_at: Date;
}
