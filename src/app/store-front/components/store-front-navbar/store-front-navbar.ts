import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-store-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './store-front-navbar.html',
})
export class StoreFrontNavbar {

  authService = inject(AuthService)

  navbar = signal([
    {
      title: 'Hombres',
      url: '/gender/men'
    },
    {
      title: 'Mujeres',
      url: '/gender/women'
    },
    {
      title: 'Kids',
      url: '/gender/kids'
    },
  ])



}

