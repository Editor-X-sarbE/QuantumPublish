// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   templateUrl: './dashboard.html',
//   styleUrls: ['./dashboard.scss']
// })
// export class Dashboard {
//   constructor(private router: Router) { }

//   navigateTo(path: string) {
//     this.router.navigate([path]);
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
