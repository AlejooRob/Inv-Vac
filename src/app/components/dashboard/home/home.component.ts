import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// Services

// Interface
import { User } from '../../../interfaces/user';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  private id: any;
  user: User[] = [];
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'vaccine', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort!: MatSort;

  constructor(private usersService: UsersService, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.id = localStorage.getItem('id')
    this.chargeUsers();
  }

  chargeUsers() {
    console.log('cargando')
    this.usersService.get(this.id).subscribe(data => {
      console.log(data)
      this.user.push(data)
      this.dataSource = new MatTableDataSource(this.user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


}
