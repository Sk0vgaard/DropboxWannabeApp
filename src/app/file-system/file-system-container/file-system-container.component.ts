import { Component, OnInit } from '@angular/core';
import { File } from '../shared/file';

@Component({
  selector: 'app-file-system-container',
  templateUrl: './file-system-container.component.html',
  styleUrls: ['./file-system-container.component.css']
})
export class FileSystemContainerComponent implements OnInit {

  file: File;

  constructor() {
    this.file = {
      fileName: 'new.jpg',
      created: '10-10-2017',
      mimeType: 'JPG',
      size: 100,
      displayName: 'EN HUND',
      owner: 'Leonora'
    };
  }

  ngOnInit() {
  }

}
