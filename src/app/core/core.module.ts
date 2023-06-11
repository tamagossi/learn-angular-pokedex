import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '@/core/components';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, ButtonComponent, FooterComponent],
  exports: [ButtonComponent, FooterComponent, HeaderComponent],
})
export class CoreModule {}
