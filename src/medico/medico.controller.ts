import { Body, Controller, Post } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from './medico.entity';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post('registrar')
  async registrar(@Body() body: Partial<Medico>) {
    return this.medicoService.registrarMedico(body);
  }
}
