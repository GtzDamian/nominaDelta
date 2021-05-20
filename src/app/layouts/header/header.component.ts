import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:String= "Desarrollo de Software";
  subTitle:String= "Consultoría";
  
  constructor() { }

  ngOnInit(): void {
  }

}
