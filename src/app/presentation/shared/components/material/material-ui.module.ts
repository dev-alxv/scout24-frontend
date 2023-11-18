import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

const matModules = [
  CommonModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatTabsModule,
  FormsModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MaterialFileInputModule,
  NgxMatColorPickerModule,
  ReactiveFormsModule,
  MatCheckboxModule
];

@NgModule({
  imports: [
    ...matModules
  ],
  exports: [
    ...matModules
  ],
  declarations: [],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class MaterialUiModule { }
