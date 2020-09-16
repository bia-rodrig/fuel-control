import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('cars')
class Car{
    @PrimaryColumn()
    plate: string;

    @Column()
    model: string;

    @Column()
    brand: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Car;