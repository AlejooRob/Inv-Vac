import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  user!: User

  constructor(public router: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    const getParam = this.router.snapshot.params.idUser;
    if (getParam) {
      this.getUser(+getParam);
    } else {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  async getUser(id: number) {
    this.usersService.get(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      error => {
        console.log(error);
      }
    );
  }

}
