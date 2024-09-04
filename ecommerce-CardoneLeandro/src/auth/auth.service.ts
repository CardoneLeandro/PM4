import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { User } from '../users/entities/users.entity';
import { SUPERADMIN } from 'config/super-admin.config';
import { UserRole } from 'src/common/enum/user.role';

@Injectable()
export class AuthService {
  constructor(readonly uRep: UsersRepository) {}

<<<<<<< HEAD
  async onApplicationBootstrap() {
    console.log(
      'AUTH SERVICE ON APPLICATION BOOTSTRAP ============>',
      SUPERADMIN,
    );
    try {
      const existingSUPERADMIN = await this.existingSUPERADMIN();
      if (existingSUPERADMIN) {
        console.log('SUPERADMIN ALREADY EXISTS');
        return;
      }

      const createdSUPERADMIN = this.uRep.create(SUPERADMIN);
      await this.uRep.save(createdSUPERADMIN);
      console.log('SUPERADMIN SUCCESSFULLY CREATED');
    } catch (error) {
      console.error('AN ERROR OCCURRED DURING SUPERADMIN CREATION', error);
    }
  }

=======
  //?     RUTA CREADA PARA VALIDAR LA EXITENCIA DE USUSARIOS EN LA BASE DE DATOS
>>>>>>> 43f08683d353a78355d56b7f75990ed2bfa75512
  async validateUser(email: string): Promise<User | null> {
    const user = await this.uRep.findOneBy({ email });
    return user;
  }

  async existingSUPERADMIN() {
    return await this.uRep.findOne({ where: { role: UserRole.SUPERADMIN } });
  }
}
