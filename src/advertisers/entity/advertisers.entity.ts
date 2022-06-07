import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('advertisers')
  export class AdvertisersEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) name: string;
    @Column({ type: 'text', nullable: true }) description?: string;
    @CreateDateColumn() createdOn?: Date;
    @CreateDateColumn() updatedOn?: Date;
  }
  