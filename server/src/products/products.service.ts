import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  private filePath = join(__dirname, '../../products.json');

  private async readData(): Promise<Product[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data) as Product[];
    } catch {
      return [];
    }
  }

  private async writeData(data: Product[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async findAll(): Promise<Product[]> {
    return this.readData();
  }

  async findOne(id: number): Promise<Product | undefined> {
    const products = await this.readData();
    return products.find((p) => p.id === id);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const products = await this.readData();
    const newProduct: Product = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...createProductDto,
    };
    products.push(newProduct);
    await this.writeData(products);
    return newProduct;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const products = await this.readData();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updateProductDto };
    await this.writeData(products);
    return products[index];
  }

  async remove(id: number): Promise<boolean> {
    const products = await this.readData();
    const newProducts = products.filter((p) => p.id !== id);
    if (newProducts.length === products.length) return false;

    await this.writeData(newProducts);
    return true;
  }
}
