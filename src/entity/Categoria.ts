import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./Producto";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio.' })
  id: number;

  @Column({ length: 50, nullable: false })
  @MaxLength(50, { message: 'El nombre de la categoría no debe exceder los 50 caracteres.' })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  nombre: string;

  @Column({ length: 500, nullable: false })
  @MaxLength(500, { message: 'La descripción de la categoría no debe exceder los 500 caracteres.' })
  @IsNotEmpty({ message: 'La descripción de la categoría es obligatoria.' })
  descripcion: string;

  @Column({ default: true })
  @IsNotEmpty({ message: 'El estado de la categoría es obligatorio.' })
  estado: boolean;

  @OneToMany(() => Productos, (productos) => productos.categoria)
  productos: Productos[];
}
