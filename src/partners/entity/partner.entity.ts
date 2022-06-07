import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('partner')
  export class PartnerEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: true }) companyNumber: string;
    @Column({ type: 'varchar', nullable: true }) companyName: string;
    @CreateDateColumn() createdOn?: Date;
    @CreateDateColumn() updatedOn?: Date;
  }
  