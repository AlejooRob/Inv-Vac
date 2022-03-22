import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  private id: any;
  admin = false;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.id = localStorage.getItem('id')
    this.chargeUsers();
  }

  chargeUsers() {
    console.log('cargando')
    this.usersService.get(this.id).subscribe(data => {
      if(data.isAdmin) {
         this.admin = true
      };
    });
  }

  async logout() {
    this.router.navigate(['/login']);
  }

}
