import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile } from '../../utils/file';



@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Input() imageFile!: File;

  @Output() changed = new EventEmitter<File>();

  croppedImage!: string;

  constructor() { }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64 as string;
  }

  onCrop() {
      const file = dataURLtoFile(this.croppedImage, this.imageFile);
      this.changed.emit(file);
  }
}
