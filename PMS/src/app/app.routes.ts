import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Chatbot } from './chatbot/chatbot';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '', component: HomeComponent },            // Default route
    { path: 'home', component: HomeComponent },
    { path: 'navbar', component: Navbar },
    { path: 'footer', component: Footer },
    { path: 'chatbot', component: Chatbot },
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    // ✅ Lazy-loaded standalone component for submission page
    {
        path: 'submission',
        loadComponent: () =>
            import('./author/submission/submission').then(
                (m) => m.SubmissionComponent // <-- matches your class name exactly
            ),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./author/dashboard/dashboard').then((m) => m.Dashboard),
    },
    {
        path: 'revision-management',
        loadComponent: () =>
            import('./author/revision-management/revision-management').then((m) => m.RevisionManagement),
    },
    {
        path: 'update-submission',
        loadComponent: () =>
            import('./author/update-submission/update-submission').then((m) => m.UpdateSubmission),
    }
];
