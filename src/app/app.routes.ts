import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MyCollectionComponent } from './pages/my-collection/my-collection.component';
import { CreatePaletteComponent } from './pages/create-palette/create-palette.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'collection/:id', component: MyCollectionComponent },
            { path: 'create', component: CreatePaletteComponent }
        ]
    },
    { path: 'login', component: LoginComponent , children: [
        { path: 'sign-in', component: SigninComponent},
        { path: 'sign-up', component: SignupComponent }
       
    ]},
    { path: '**', component: NotFoundComponent }
];
