import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdInputModule, MdTabsModule, MdGridListModule, MdMenuModule, MdToolbarModule, MdTooltipModule, MdCardModule, MdListModule, MdIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
    imports: [NoopAnimationsModule, FlexLayoutModule, NgPipesModule, MdIconModule, MdButtonModule, MdInputModule, MdTabsModule, MdGridListModule, MdMenuModule, MdToolbarModule, MdTooltipModule, MdCardModule, MdListModule],
    exports: [NoopAnimationsModule, FlexLayoutModule, NgPipesModule, MdIconModule, MdButtonModule, MdInputModule, MdTabsModule, MdGridListModule, MdMenuModule, MdToolbarModule, MdTooltipModule, MdCardModule, MdListModule],
})
export class UiModule { }
