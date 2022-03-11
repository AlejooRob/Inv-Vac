import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if(username == 'juan' && password == '123' ) {
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['dashboard'])
      }, 2000);
    } else {
      this.error();
    }
  }


  error() {
    this._snackBar.open('El usuario o contraseña son incorrectos', '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    this.form.reset()
  }



}
