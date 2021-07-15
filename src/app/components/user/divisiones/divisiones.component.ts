import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/models/dto/division';
import { DivisionService } from 'src/app/models/services/division.service';
import { AuthService } from 'src/app/models/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-divisiones',
  templateUrl: './divisiones.component.html',
  styleUrls: ['./divisiones.component.css']
})
export class DivisionesComponent implements OnInit {

  public division:Division = new Division();
  divisiones!: Division[];


  constructor(
    private divisionService: DivisionService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Divisiones | Información Gerencial - Nómina");
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.divisionService.getDivisiones(id).subscribe(
          (divisiones) => {this.divisiones = divisiones}
        )
      }
    })
  }

}
