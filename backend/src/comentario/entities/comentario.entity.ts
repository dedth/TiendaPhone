import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: 'comentario' })
export class ComentarioEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false, })
    nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false, })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: false, })
    comentario: string;    
  
}
