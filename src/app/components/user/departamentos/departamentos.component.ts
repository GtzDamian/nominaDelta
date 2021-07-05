import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/dto/departamento';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  public concepto:Departamento = new Departamento();

  departamentos!: Departamento[];

  constructor() { }

  ngOnInit(): void {
  }

}
