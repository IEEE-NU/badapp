import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgArrayPipesModule } from 'ngx-pipes';

@NgModule({
    imports: [NoopAnimationsModule, FlexLayoutModule, NgArrayPipesModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule],
    exports: [NoopAnimationsModule, FlexLayoutModule, NgArrayPipesModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule],
})
export class UiModule { }
