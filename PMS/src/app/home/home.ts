// import { Component, AfterViewInit } from '@angular/core';
// import { DotLottie } from '@lottiefiles/dotlottie-web';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [],
//   templateUrl: './home.html',
//   styleUrls: ['./home.scss']
// })
// export class HomeComponent implements AfterViewInit {

//   ngAfterViewInit(): void {
//     const canvas = document.querySelector<HTMLCanvasElement>('#lottie-hero');
//     if (canvas) {
//       new DotLottie({
//         autoplay: true,
//         loop: true,
//         canvas: canvas,
//         src: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie'
//       });
//     }
//   }
// }


import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]   // 👈 Add this
})
export class HomeComponent { }
