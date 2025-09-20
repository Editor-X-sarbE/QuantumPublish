import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Chatbot } from './chatbot/chatbot'; // 1. IMPORT the chatbot component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, Chatbot], // 2. ADD the Chatbot to the imports array
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('PMS');
}

// import { Component, signal, computed, inject } from '@angular/core';
// import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
// import { Navbar } from './navbar/navbar';
// import { Footer } from './footer/footer';
// import { Chatbot } from './chatbot/chatbot';
// import { filter } from 'rxjs/operators';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, Navbar, Footer, Chatbot],
//   templateUrl: './app.html',
//   styleUrls: ['./app.scss']
// })
// export class App {
//   protected readonly title = signal('PMS');
//   private router = inject(Router);

//   // ✅ Track current route
//   currentRoute = signal('');

//   // ✅ Computed flag for login/register pages
//   isAuthPage = computed(() =>
//     this.currentRoute().includes('/login') ||
//     this.currentRoute().includes('/register')
//   );

//   constructor() {
//     this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe((event: any) => {
//         this.currentRoute.set(event.urlAfterRedirects);
//       });
//   }
// }
