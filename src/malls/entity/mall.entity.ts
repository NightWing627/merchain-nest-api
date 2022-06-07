import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from 'src/products/entity/product.entity';

@Entity('mall')
export class MallEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'varchar', nullable: true }) fantasiaName: string;
  @Column({ type: 'varchar', nullable: true }) companyName: string;
  @Column({ type: 'varchar', nullable: true }) companyNumber: string;
  @Column({ type: 'varchar', nullable: true }) companyPhone: string;
  @Column({ type: 'varchar', nullable: true }) address: string;
  @Column({ type: 'numeric', nullable: true }) shoppingNumber: number;
  @Column({ type: 'varchar', nullable: true }) neighborhood: string;
  @Column({ type: 'varchar', nullable: true }) city: string;
  @Column({ type: 'varchar', nullable: true }) state: string;
  @Column("varchar", { nullable: true, array: true }) partners: string[];
  @Column({ type: 'uuid', nullable: true }) financialId: string;
  @Column({ type: 'uuid', nullable: true }) legalId: string;
  @Column({ type: 'varchar', nullable: true }) avartar: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
  @OneToMany(type => ProductEntity, p => p.mall)
  products: ProductEntity[];
}
