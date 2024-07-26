import "reflect-metadata"
import { DataSource } from "typeorm"
import { Productos } from "./entity/Producto"
import { Categoria } from "./entity/Categoria"
import { Cliente } from "./entity/Cliente"
import { DetalleFactura } from "./entity/DetalleFactura"
import { Factura } from "./entity/Factura"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "deyfranbd",
    synchronize: true,
    logging: false,
    entities: [DetalleFactura,Categoria, Productos, Cliente, Factura,Vendedor , Proveedor],
    migrations: [],
    subscribers: [],
})
