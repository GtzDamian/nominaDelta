import { Empresa } from '../dto/empresa';

export class Usuario {
    id!: number;
    username!: string;
    nombre!: string;
    apellido!: string;
    password!: string;
    createAt!: string;
    enabled!: boolean;
    empresa!: Empresa[];
}
