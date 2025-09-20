import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Chatbot } from './chatbot/chatbot'; // 1. IMPORT the chatbot component
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '', component: HomeComponent },   // default route
    { path: 'home', component: HomeComponent }, // optional /home
    { path: 'navbar', component: Navbar }, // optional /navbar
    { path: 'footer', component: Footer }, // optional /footer
    { path: 'chatbot', component: Chatbot }, // optional /chatbot
    { path: 'login', component: Login }, // optional /login
    { path: 'register', component: Register } // optional /register
];
