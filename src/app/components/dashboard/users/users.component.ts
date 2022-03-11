import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// Services

// Interface
import { User } from '../../../interfaces/user';

// Components
import { DeleteComponent } from './delete/delete.component';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  usersList: User[] = [];
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'vaccine', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort!: MatSort;

  constructor(private usersService: UsersService, public dialog: MatDialog) { }


  async ngAfterViewInit() {
    await this.chargeUsers();
  }

  chargeUsers() {
    console.log('cargando')
    this.usersService.getAll().subscribe(data => {
      this.usersList = data;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    console.log('filtrando')
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
      data: {id, name, confirm: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.usersService.delete(result.id).subscribe();
        this.chargeUsers();
      }
    });
  }

}
