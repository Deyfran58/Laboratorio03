import { IsNotEmpty, MaxLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Factura } from "./Factura";

@Entity()
export class Vendedor {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'Debe indicar el ID del vendedor.' })
  Codigo_Vendedor: number;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el nombre del vendedor.' })
  @MaxLength(50, { message: 'El nombre del vendedor debe contener un máximo de 50 caracteres.' })
  Nombre_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el apellido del vendedor.' })
  @MaxLength(50, { message: 'El apellido del vendedor debe contener un máximo de 50 caracteres.' })
  Apellido_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar la dirección del vendedor.' })
  @MaxLength(500, { message: 'La dirección del vendedor debe contener un máximo de 500 caracteres.' })
  Direccion_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el teléfono del vendedor.' })
  @MaxLength(8, { message: 'El teléfono del vendedor debe contener un máximo de 8 caracteres.' })
  Telefono_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el celular del vendedor.' })
  @MaxLength(8, { message: 'El celular del vendedor debe contener un máximo de 8 caracteres.' })
  Celular_Vendedor: string;

  @OneToMany(() => Factura, (factura) => factura.vendedor)
  facturas: Factura[];
}
