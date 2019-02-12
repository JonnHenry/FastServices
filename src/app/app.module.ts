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
import { ModUsuarioComponent } from './mod-usuario/mod-usuario.component';
import { ModServicioComponent } from './mod-servicio/mod-servicio.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { UbicacionService } from './ubicacion/ubicacion.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FacturaComponent } from './factura/factura.component';

// tslint:disable-next-line:prefer-const
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
    ModUsuarioComponent,
    ModServicioComponent,
    ChatComponent,
    UbicacionComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireStorageModule,
    LeafletModule.forRoot()
  ],
  providers: [UbicacionService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,

    },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
