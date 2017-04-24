import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [MdButtonModule, MdCheckboxModule, NoopAnimationsModule, FlexLayoutModule],
    exports: [MdButtonModule, MdCheckboxModule, NoopAnimationsModule, FlexLayoutModule],
})
export class UiModule { }
