import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { DetalleFactura } from "./DetalleFactura";
import { Productos } from "./Producto";

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  Numero: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  cliente: Cliente;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.facturas)
  vendedor: Vendedor;

  @OneToMany(() => DetalleFactura, detalle => detalle.factura, {cascade:true})
  detallesFactura: DetalleFactura[];
}
