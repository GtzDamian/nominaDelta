import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Division } from 'src/app/models/dto/division';
import { DivisionService } from 'src/app/models/services/division.service';
import { AuthService } from 'src/app/models/services/auth.service';

@Component({
  selector: 'app-divisionesForm',
  templateUrl: './divisionesForm.component.html',
  styleUrls: ['./divisionesForm.component.css']
})
export class DivisionesFormComponent implements OnInit {

  division: Division = new Division();

  constructor(
    private divisionService: DivisionService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

}
