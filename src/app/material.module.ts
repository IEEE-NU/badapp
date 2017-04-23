import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [MdButtonModule, MdCheckboxModule, NoopAnimationsModule],
    exports: [MdButtonModule, MdCheckboxModule, NoopAnimationsModule],
})
export class MaterialModule { }
