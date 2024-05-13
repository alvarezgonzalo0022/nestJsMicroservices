import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const { name, description, price } = createProductDto;

    const newProduct = new Product(
      uuid(),
      name,
      description,
      price,
    );
    this.products.push(newProduct);
    
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find(product => product.id === id);
    
    if(!product) throw new NotFoundException(`Product with ${id} not found`);

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...rest } = updateProductDto;
    const product = this.findOne(id);

    product.updateWith(rest);

    return product;

  }

  remove(id: string): Product {
    const product = this.findOne(id);
    this.products = this.products.filter(product => product.id !== id);

    return product;
  }
}
