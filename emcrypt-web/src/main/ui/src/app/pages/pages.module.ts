import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routing } from './routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(Routing)],
})
export class PagesModule {}
