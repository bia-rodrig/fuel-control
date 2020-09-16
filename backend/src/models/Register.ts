import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Car from './Car';

@Entity('registers')
class Register{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    carPlate: string; //placa da tabela cars

    //propriedade - que vai ser instancia da classe Car
    //quantos carros um registro tem? Um
    //quantos registros um carro tem? Muitos
    //partindo daqui(Registro) ManyToOne - que chama uma função que retorna
    //qual model deve usar
    @ManyToOne(() => Car)
    @JoinColumn({ name: 'carPlate'}) //qual que é a coluna que vai identificar
    car: Car; //qual que é o carro desse registro
    //car: é uma propriedade JavaScript, que instancia o Car

    @Column()
    date: string;

    @Column('integer')
    currentKm: number;

    @Column()
    fuel: string;

    @Column('integer')
    liters: number;

    @Column('money')
    priceLiter: number;

    @Column('money')
    totalValue: number;

    @Column()
    gasInfo: string;
}

export default Register;