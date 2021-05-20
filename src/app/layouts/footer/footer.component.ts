import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  email:String = "correo_gtz@hotmail.com";
  soporte:String ="55 8912 3454";
  ventas:String="(55)5639-2326";
  
  constructor() { }

  ngOnInit(): void {
  }

}
