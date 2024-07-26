import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";
import { Categoria } from "./Categoria";
import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

@Entity()
export class Productos {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Debe indicar el ID del producto.' })
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el nombre del producto.' })
  @MaxLength(50, { message: 'El nombre debe contener un máximo de 50 caracteres.' })
  nombre: string;

  @Column()
  @IsNumber({}, { message: 'El precio debe ser un valor numérico.' })
  @IsNotEmpty({ message: 'Debe indicar el precio del producto.' })
  precio: number;

  @Column()
  @IsNumber({}, { message: 'El stock debe ser un valor numérico.' })
  @IsNotEmpty({ message: 'Debe indicar el stock del producto.' })
  stock: number;

  @Column({ default: 1 })
  estado: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  proveedor: Proveedor;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.producto)
  detallesFactura: DetalleFactura[];
}
