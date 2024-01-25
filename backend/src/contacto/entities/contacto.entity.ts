import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contacto' })
export class ContactoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false, })
    nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false, })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: false, })
    asunto: string;    
  
    @Column({ type: 'varchar', length: 200, nullable: false,})
    mensage: string;
}
