import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userLoggedIn = false;
  constructor(private router: Router) {

  }

  loginUser(f) {
    if ( f != null) {
      this.userLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }

  }
}
