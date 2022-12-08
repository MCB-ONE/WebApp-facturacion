import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDirective } from './file-upload.directive';
import { FileUploadComponent } from './file-upload.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
import { UploadComponent } from './components/upload/upload.component';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { MatButtonModule } from '@angular/material/button';
import { CropperComponent } from './components/cropper/cropper.component';


@NgModule({
  declarations: [
    FileUploadDirective,
    FileUploadComponent,
    DropZoneDirective,
    UploadComponent,
    FileSizePipe,
    CropperComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ImageCropperModule
  ],
  exports: [
    FileUploadDirective
  ]
})
export class FileUploadModule { }
