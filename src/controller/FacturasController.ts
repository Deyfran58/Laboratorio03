import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entity/Factura";
import { Cliente } from "../entity/Cliente";
import { DetalleFactura } from "../entity/DetalleFactura";
import { Vendedor } from "../entity/Vendedor";
import { validate} from "class-validator";
import { Productos } from "../entity/Producto";

class FacturasController {

  static getAll = async (req: Request, res: Response) => {
    try {
      const repoFactura = AppDataSource.getRepository(Factura);

      const listaFacturas = await repoFactura.find({
        relations: ['cliente', 'vendedor', 'detallesFactura.producto']
      });

      if (listaFacturas.length === 0) {
        return res.status(404).json({ message: "Actualmente no hay facturas en el sistema." });
      }

      return res.status(200).json(listaFacturas);
    } catch (error) {
      return res.status(500).json({ message: "Se produjo un error al intentar recuperar las facturas." });
    }
  }

  static getOne = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params['id']);

      if (isNaN(id)) {
        return res.status(400).json({ message: "El ID proporcionado no es válido." });
      }

      const repo = AppDataSource.getRepository(Factura);

      try {
        const factura = await repo.findOneOrFail({
          where: { Numero: id },
          relations: ['cliente', 'vendedor', 'detallesFactura']
        });
        return res.status(200).json(factura);
      } catch (error) {
        return res.status(404).json({ message: `No se encontró la factura con el ID ${id}.` });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error al intentar acceder a la base de datos." });
    }
  }

  static create = async (req: Request, res: Response) => {
    const repoFactura = AppDataSource.getRepository(Factura);

    try {
      const { fecha, clienteID, vendedorID, detallesFactura } = req.body;

      let factura = new Factura();
      factura.fecha = new Date(fecha);

      const repoCliente = AppDataSource.getRepository(Cliente);
      const repoVendedor = AppDataSource.getRepository(Vendedor);
      const cliente = await repoCliente.findOneOrFail({ where: { Ruc_Cliente: clienteID } });
      const vendedor = await repoVendedor.findOneOrFail({ where: { Codigo_Vendedor: vendedorID } });
      factura.cliente = cliente;
      factura.vendedor = vendedor;

      const repoProducto = AppDataSource.getRepository(Productos);
      let detalles = [];

      for (let detalle of detallesFactura) {
        let detalleFactura = new DetalleFactura();
        detalleFactura.factura = factura;

        const producto = await repoProducto.findOneOrFail({ where: { id: detalle.Codigo_Producto } });
        detalleFactura.producto = producto;
        detalleFactura.cantidad = detalle.cantidad;

        detalles.push(detalleFactura);
      }

      factura.detallesFactura = detalles;

      const errores = await validate(factura);
      if (errores.length > 0) {
        return res.status(400).json({ message: "Hay errores en los datos proporcionados.", errors: errores });
      }

      await repoFactura.save(factura);

      return res.status(201).json({ message: "La factura se ha creado exitosamente." });
    } catch (error) {
      return res.status(500).json({ message: "No se pudo guardar la factura. Intente nuevamente." });
    }
  }

  static delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params['id']);

      if (isNaN(id)) {
        return res.status(400).json({ message: "El ID proporcionado no es válido." });
      }

      const repo = AppDataSource.getRepository(Factura);

      let factura;
      try {
        factura = await repo.findOneOrFail({
          where: { Numero: id },
          relations: ['cliente', 'vendedor', 'detallesFactura']
        });
      } catch (error) {
        return res.status(404).json({ message: "No se encontró la factura con el ID especificado." });
      }

      await repo.remove(factura);
      return res.status(200).json({ message: "Factura eliminada con éxito." });
    } catch (error) {
      return res.status(500).json({ message: "Error al intentar eliminar la factura. Por favor, intente de nuevo." });
    }
  }
}

export default FacturasController;
