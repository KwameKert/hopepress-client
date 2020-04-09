import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { PreloaderComponent } from 'src/app/shared/preloader/preloader.component';


@NgModule({
  declarations: [LoginComponent, PreloaderComponent],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MatFormFieldModule
  ],
})
export class AuthenticationModule { }
