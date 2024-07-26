import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";
import { Productos } from "./Producto";
import { IsNotEmpty, IsNumber } from "class-validator";

@Entity()
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Factura, factura => factura.detallesFactura)
  factura: Factura;
  
  @ManyToOne(() => Productos, producto => producto.detallesFactura)
  producto: Productos;

  @Column()
  @IsNumber({}, { message: 'La cantidad debe ser un valor numérico.' })
  @IsNotEmpty({ message: 'Debe indicar la cantidad.' })
  cantidad: number;
}
