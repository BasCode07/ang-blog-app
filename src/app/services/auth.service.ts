import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login( email, password){
    this.afAuth.signInWithEmailAndPassword(email, password).then(logFef =>{
      this.toastr.success('Login successfully')
      this.loadUser()

      this.loggedIn.next(true);
      this.isLoggedGuard = true;

      this.router.navigate(['/'])
    }).catch(e =>{
      this.toastr.warning('invalid email or password passed');
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user =>{
      localStorage.setItem('user', JSON.stringify(user));
    })
  }

  logOut(){
    this.afAuth.signOut().then(() =>{
      this.toastr.success('log out successfully');
      localStorage.removeItem('user');

      this.loggedIn.next(false);
      this.isLoggedGuard = false;

      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }

}
