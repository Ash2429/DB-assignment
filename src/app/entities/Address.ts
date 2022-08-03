import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("address")
    export class Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public Id: string;

        @Column({ nullable: false })
        public addressLine1: string;

        @Column({ nullable: false })
        public addressLine2: string;

        @Column({ nullable: false })
        public city: string;

        @Column({ nullable: false })
        public state: string;

        @Column({ nullable: false })
        public zipcode: string;

}