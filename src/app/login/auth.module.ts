import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
