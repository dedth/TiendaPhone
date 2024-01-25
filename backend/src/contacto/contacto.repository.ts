import { ContactoEntity } from './entities/contacto.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ContactoEntity)
export class ContactoRepository extends Repository<ContactoEntity> {}
