import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SvgLineComponent } from './svg-line/svg-line.component';

@NgModule({
  declarations: [SvgLineComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, SvgLineComponent],
})
export class SharedModule {}
