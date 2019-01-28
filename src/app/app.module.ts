import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceConfig, FacebookLoginProvider, LinkedInLoginProvider, SocialLoginModule  } from 'angularx-social-login';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders} from './app-routing.module';
import { BuscarComponent } from './buscar/buscar.component';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ModUsuarioComponent } from './mod-usuario/mod-usuario.component';
import { ServiciosComponent } from './servicios/servicios.component';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('523602188127601'),
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    LoginComponent,
    BuscarComponent,
    SolicitarComponent,
    ConfiguracionComponent,
    ModUsuarioComponent,
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,

    },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
