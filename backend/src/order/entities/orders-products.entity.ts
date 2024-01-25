import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductosEntity } from 'src/productos/productos.entity';

@Entity({ name: 'ordenes-productos' })
export class OrdersProducts {
  @PrimaryColumn()
  orderId: string;

  @ManyToOne((type) => OrderEntity, (order) => order.OrdersProducts)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @PrimaryColumn()
  productId: string;

  @ManyToOne((type) => ProductosEntity, (product) => product.OrdersProducts)
  @JoinColumn({ name: 'productId' })
  product: ProductosEntity;

  @Column()
  quantity: number;
}
