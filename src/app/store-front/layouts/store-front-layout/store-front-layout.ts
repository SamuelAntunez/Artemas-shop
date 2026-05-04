import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreFrontNavbar } from "../../components/store-front-navbar/store-front-navbar";

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, StoreFrontNavbar],
  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout { }
