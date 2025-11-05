import { Body, Controller, Post } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from './medico.entity';
import * as bcrypt from 'bcrypt';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  // REGISTRO
  @Post('registrar')
  async registrar(@Body() body: Partial<Medico>) {
    return await this.medicoService.registrarMedico(body);
  }

  // LOGIN
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const { email, password } = body;

      if (!email || !password) {
        return { success: false, message: 'Debe ingresar email y contraseña' };
      }

      // Buscar al médico
      const medico = await this.medicoService.findByEmail(email);

      if (!medico) {
        return { success: false, message: 'Correo no registrado' };
      }

      // Verificar contraseña encriptada
      const valid = await bcrypt.compare(password, medico.password);
      if (!valid) {
        return { success: false, message: 'Contraseña incorrecta' };
      }

      // Quitar la contraseña del objeto de salida
      const { password: _, ...dataSinPassword } = medico;

      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        data: dataSinPassword,
      };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  }
}
