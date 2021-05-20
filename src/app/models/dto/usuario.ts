import { Empresa } from '../dto/empresa';
import { Role } from '../dto/role';

export class Usuario {
    id!: number;
    username!: string;
    nombre!: string;
    apellido!: string;
    password!: string;
    createAt!: string;
    enabled!: boolean;
    empresa!: Empresa[];
    roles: Role[] = [];
}
