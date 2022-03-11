import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  user: User | null | undefined;
  isNew: boolean = false;
  form: FormGroup;
  public sendInvalid = false;
  public loading = false;

  constructor(
    public route: ActivatedRoute, 
    private usersService: UsersService, 
    private fb: FormBuilder, 
    private router: Router, 
    private _snackBar: MatSnackBar ) {
      this.form = this.fb.group({
      firstName: ['', Validators.pattern("[a-zA-Z ]*")],
      lastName: ['', Validators.pattern("[a-zA-Z ]*")],
      cardIdent: ['', [Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', Validators.email],
      birthDate: [null],
      address: [null],
      phone: [null],
      isVaccine: [false],
      vaccine: [null],
      vaccineDate: [null],
      vaccineTimes: [null],
    });
    }

   ngOnInit(): void {
    const getParam = this.route.snapshot.params.idUser;
    if (getParam) {
      this.getUser(+getParam);
    } else {
      this.isNew = true;
    }
  }

  async getUser(id: number) {
    this.usersService.get(id).subscribe(
      (user: User) => {
        this.user = user;
        this.form.patchValue(user)
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit(): Promise<void> {
    this.sendInvalid = false;
    this.loading = true;
    if (this.form.valid) {
      try {
        const userPayload = {
          cardIdent: this.form.get('cardIdent')?.value,
          firstName: this.form.get('firstName')?.value,
          lastName: this.form.get('lastName')?.value,
          password: this.form.get('cardIdent')?.value,
          email: this.form.get('email')?.value,
          birthDate: this.form.get('birthDate')?.value,
          address: this.form.get('address')?.value,
          phone: this.form.get('phone')?.value,
          isVaccine: this.form.get('isVaccine')?.value,
          vaccine: this.form.get('vaccine')?.value,
          vaccineDate: this.form.get('vaccineDate')?.value,
          vaccineTimes: this.form.get('vaccineTimes')?.value,
        }
        if (this.isNew) {
          await this.usersService.create(userPayload).subscribe(data => {
            this._snackBar.open('Usuario creado con éxito!', 'Cerrar', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000,
            });
            this.router.navigate(['dashboard/usuarios']);
          }, error => {
            this.sendInvalid = true;
          });
        } else {
          await this.usersService.update(parseInt(this.route.snapshot.params.idUser), userPayload).subscribe(data => {
            this._snackBar.open('Usuario actualizado con éxito!', 'Cerrar', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000,
            });
            this.router.navigate(['dashboard']);
          }, error => {
            this.sendInvalid = true;
          });
        }
        this.loading = false;
      } catch (err) {
        this.sendInvalid = true;
      }
    }
  }

}
