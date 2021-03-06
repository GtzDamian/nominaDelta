import { Empresa } from '../dto/empresa';
import { Role } from '../dto/role';

export class Usuario {
    id!: number;
    username!: string;
    nombre!: string;
    apellido!: string;
    password!: string;
    tConceptos!:boolean;
    tDepartamentos!:boolean;
    tPuestos!:boolean;
    tEmpleados!:boolean;
    tDivisiones!:boolean;
    tUsuarios!:boolean;
    tDatosGenerales!:boolean;
    cPorDivision!: boolean;
    cPorConcepto!: boolean;
    cPorEmpleado!: boolean;
    cDeEmpleado!: boolean;
    eExcel!: boolean;
    ePdf!: boolean;
    createAt!: string;
    enabled!: boolean;
    empresa!: Empresa[];
    roles: Role[] = [];
}
