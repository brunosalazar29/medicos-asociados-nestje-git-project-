import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepo: Repository<Medico>,
  ) {}

  async registrarMedico(data: Partial<Medico>) {
    const existe = await this.medicoRepo.findOne({ where: { email: data.email ?? '' } });
    if (existe) {
      throw new Error('El correo ya está registrado');
    }

    const medico = new Medico();
    medico.email = data.email ?? '';
    medico.password = await bcrypt.hash(data.password ?? '', 10);
    medico.nombres = data.nombres ?? '';
    medico.apellidos = data.apellidos ?? '';
    medico.telefono1 = data.telefono1 ?? '';
    medico.telefono2 = data.telefono2 ?? '';
    medico.tipodoc = data.tipodoc ?? '';
    medico.nrodocumento = data.nrodocumento ?? '';
    medico.check_termino = data.check_termino ?? 0;
    medico.check_datos = data.check_datos ?? 0;
    medico.check_cookie = data.check_cookie ?? 0;
    medico.activo = 1;
    medico.google_code = data.google_code ?? `TEMP-${Date.now()}`; // 👈 agregado

    return this.medicoRepo.save(medico);
  }


  async findByEmail(email: string): Promise<Medico | null> {
    return this.medicoRepo.findOne({ where: { email } });
  }
  
  }




