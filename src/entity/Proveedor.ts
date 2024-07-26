import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./Producto";
import { MaxLength, IsNotEmpty } from "class-validator";

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  Codigo_Proveedor: number;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el nombre del proveedor.' })
  @MaxLength(50, { message: 'El nombre del proveedor debe contener un máximo de 50 caracteres.' })
  Nombre_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el apellido del proveedor.' })
  @MaxLength(50, { message: 'El apellido del proveedor debe contener un máximo de 50 caracteres.' })
  Apellido_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar la dirección del proveedor.' })
  @MaxLength(500, { message: 'La dirección del proveedor debe contener un máximo de 500 caracteres.' })
  Direccion_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar la provincia del proveedor.' })
  @MaxLength(50, { message: 'La provincia del proveedor debe contener un máximo de 50 caracteres.' })
  Provincia_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el teléfono del proveedor.' })
  @MaxLength(8, { message: 'El teléfono del proveedor debe contener un máximo de 8 caracteres.' })
  Telefono_Proveedor: string;

  @OneToMany(() => Productos, (productos) => productos.proveedor)
  productos: Productos[];
}
