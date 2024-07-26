import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { MaxLength, IsNotEmpty } from "class-validator";
import { Factura } from "./Factura";

@Entity()
export class Cliente {
  @PrimaryColumn()
  @MaxLength(50, { message: 'El RUC del cliente no debe exceder los 50 caracteres.' })
  @IsNotEmpty({ message: 'El RUC del cliente es obligatorio.' })
  Ruc_Cliente: string;

  @Column()
  @MaxLength(50, { message: 'El nombre del cliente no debe exceder los 50 caracteres.' })
  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio.' })
  Nombre_Cliente: string;

  @Column()
  @MaxLength(50, { message: 'El apellido del cliente no debe exceder los 50 caracteres.' })
  @IsNotEmpty({ message: 'El apellido del cliente es obligatorio.' })
  Apellido_Cliente: string;

  @Column()
  @MaxLength(500, { message: 'La dirección del cliente no debe exceder los 500 caracteres.' })
  @IsNotEmpty({ message: 'La dirección del cliente es obligatoria.' })
  Direccion_Cliente: string;

  @Column()
  @MaxLength(8, { message: 'El teléfono del cliente no debe exceder los 8 caracteres.' })
  @IsNotEmpty({ message: 'El teléfono del cliente es obligatorio.' })
  Telefono_Cliente: string;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];
}
