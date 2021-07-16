import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Division } from 'src/app/models/dto/division';
import { DivisionService } from 'src/app/models/services/division.service';
import { AuthService } from 'src/app/models/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-divisionesForm',
  templateUrl: './divisionesForm.component.html',
  styleUrls: ['./divisionesForm.component.css']
})
export class DivisionesFormComponent implements OnInit {

  division: Division = new Division();
  rfcExists!: boolean;

  constructor(
    private divisionService: DivisionService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.rfcCheck();
    this.cargarDivision();
  }

  public rfcCheck(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['divId'];
      if(id != null ){
        this.rfcExists = true;
      }else{
        this.rfcExists = false;
      }
    });
  }

  cargarDivision(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['divId']
      if(id){
        this.divisionService.getDivision(id).subscribe( (division) => this.division = division)
      }
    })
  }

  public create():void{
    if(this.division.division == null ||  this.division.division == '' || this.division.departamento == null || this.division.departamento == '' || this.division.nombre == null ||  this.division.nombre == '' || this.division.nomGraf == null || this.division.nomGraf == ''){
      Swal.fire('Error', 'Uno o más campos vacíos', 'error')
    }else{
      this.activatedRoute.params.subscribe(params => {
        var id:any = params['id'];
        if(id){
          this.divisionService.create(this.division, id).subscribe(usuario => {
            Swal.fire('Registro exitoso','La division ' + this.division.division + ' - ' + this.division.nombre + ' se ha registrado correctamente', 'success');
            this.router.navigate(['/sig/home/' + this.authService.usuario.empresa + '/divisiones'])
          })
        }
      })
    }
  }

  public update(): void{
    this.activatedRoute.params.subscribe(params => {
      var id:number = params['id'];
      if(id){
        if(this.division.division == null ||  this.division.division == '' || this.division.departamento == null || this.division.departamento == '' || this.division.nombre == null ||  this.division.nombre == '' || this.division.nomGraf == null || this.division.nomGraf == ''){
          Swal.fire('Error', 'Uno o más campos vacíos', 'error')
        }else{
          this.divisionService.update(this.division).subscribe(division => {
            Swal.fire('Actualización exitosa', 'La division ' + this.division.division + ' - ' + this.division.nombre + ' se ha actualizado correctamente', 'success')
            this.router.navigate(['/sig/home/' + this.authService.usuario.empresa + '/divisiones'])
          })
        }
      }
    })
  }

}

