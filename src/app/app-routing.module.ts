import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { BuscarComponent } from './buscar/buscar.component';


const appRoutes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegistroComponent},
  {path: 'buscar', component : BuscarComponent},
  {path: 'registro', component : RegistroComponent},
  {path: 'solicitar', component : SolicitarComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
