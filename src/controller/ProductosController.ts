import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entity/Producto";
import { validate } from "class-validator";
import { Categoria } from "../entity/Categoria";
import { Proveedor } from "../entity/Proveedor";

class ProductosController {

  static getAll = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Productos);
      
      const listaProductos = await repo.find({
        where: { estado: true },
        relations: { categoria: true }
      });

      if (listaProductos.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos en la base de datos." });
      }

      return res.status(200).json(listaProductos);
    } catch (error) {
      return res.status(500).json({ message: "Ocurrió un problema al intentar acceder a los productos." });
    }
  }

  static create = async (req: Request, res: Response) => {
    const repoProducto = AppDataSource.getRepository(Productos);

    try {
      const { id, nombre, precio, stock, categoria, proveedor } = req.body;

      let product = await repoProducto.findOne({ where: { id } });
      if (product) {
        return res.status(400).json({ message: "El producto ya está registrado en el sistema." });
      }

      product = new Productos();
      product.id = id;
      product.nombre = nombre;
      product.precio = precio;
      product.stock = stock;
      product.estado = true;

      const errors = await validate(product);
      if (errors.length > 0) {
        return res.status(400).json({ message: "Se encontraron errores en los datos proporcionados.", errors: errors });
      }

      const repoCategoria = AppDataSource.getRepository(Categoria);
      let cat;
      try {
        cat = await repoCategoria.findOneOrFail({ where: { id: categoria } });
      } catch (ex) {
        return res.status(400).json({ message: "La categoría especificada no existe." });
      }
      product.categoria = cat;

      const repoProveedor = AppDataSource.getRepository(Proveedor);
      let prov;
      try {
        prov = await repoProveedor.findOneOrFail({ where: { Codigo_Proveedor: proveedor } });
      } catch (ex) {
        return res.status(400).json({ message: "El proveedor especificado no existe." });
      }
      product.proveedor = prov;

      await repoProducto.save(product);

      return res.status(201).json({ message: "Producto creado con éxito.", producto: product });
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      return res.status(500).json({ message: "No se pudo guardar el producto. Intente nuevamente." });
    }
  }

  static getOne = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params['id']);

      if (isNaN(id)) {
        return res.status(400).json({ message: "El ID proporcionado no es válido." });
      }

      const repo = AppDataSource.getRepository(Productos);

      try {
        const producto = await repo.findOneOrFail({
          where: { id, estado: true },
          relations: { categoria: true }
        });
        return res.status(200).json(producto);
      } catch (error) {
        return res.status(404).json({ message: `No se encontró el producto con el ID ${id}.` });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error al intentar acceder al producto." });
    }
  }

  static update = async (req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Productos);

      const id = parseInt(req.params['id']);
      const { nombre, precio, stock, categoria } = req.body;

      let producto;
      try {
        producto = await repo.findOneOrFail({ where: { id } });
      } catch (error) {
        return res.status(404).json({ message: "El producto con el ID indicado no existe en la base de datos." });
      }

      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;

      const errors = await validate(producto, { validationError: { target: false, value: false } });

      const repoCategoria = AppDataSource.getRepository(Categoria);
      let cat;
      try {
        cat = await repoCategoria.findOneOrFail({ where: { id: categoria } });
      } catch (ex) {
        return res.status(400).json({ message: "La categoría especificada no existe." });
      }
      producto.categoria = cat;

      await repo.save(producto);

      return res.status(200).json({ message: "Producto actualizado con éxito." });
    } catch (error) {
      return res.status(500).json({ message: "No se pudo actualizar el producto. Intente de nuevo." });
    }
  }

  static delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params['id']);

      if (isNaN(id)) {
        return res.status(400).json({ message: "El ID proporcionado no es válido." });
      }

      const repo = AppDataSource.getRepository(Productos);

      let producto;
      try {
        producto = await repo.findOneOrFail({ where: { id } });
      } catch (error) {
        return res.status(404).json({ message: "El producto con el ID indicado no existe en la base de datos." });
      }

      producto.estado = false;
      await repo.save(producto);

      return res.status(200).json({ message: "Producto desactivado correctamente." });
    } catch (error) {
      return res.status(500).json({ message: "Error al intentar eliminar el producto. Por favor, inténtelo de nuevo." });
    }
  }
}

export default ProductosController;
