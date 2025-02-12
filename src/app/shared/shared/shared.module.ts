import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonePipe } from '../pipes/telefone.pipe';




@NgModule({
  declarations: [TelefonePipe],
  imports: [
    CommonModule
  ],
  exports: [TelefonePipe]
})
export class SharedModule { }
