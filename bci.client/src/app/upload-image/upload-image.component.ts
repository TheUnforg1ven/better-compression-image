import { Component, OnInit } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  public imgResultBeforeCompress: string;
  public imgResultAfterCompress: string;

  public compressionValue = 10;
  public warnInput = false;

  constructor(private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
  }

  compressFile(): void {
    if (isNaN(this.compressionValue) ||  this.compressionValue > 100 ||  this.compressionValue < 1) {
      this.warnInput = true;
      return;
    }

    this.warnInput = false;
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompress = image;
      this.imageCompress.compressFile(image, orientation, 50, this.compressionValue).then(
        result => {
          this.imgResultAfterCompress = result;
        }
      );
    });
  }

  reloadImages(): void {
    this.imgResultBeforeCompress = null;
    this.imgResultAfterCompress = null;
  }

  generateRandomStr(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  downdloadImg(href: string, name: string): void {
    const link = document.createElement('a');
    link.href = href;
    link.download = `${name}.jpg`;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
