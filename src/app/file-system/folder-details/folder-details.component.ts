import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folder } from '../shared/folder';
import { File } from '../shared/file';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {

  @Input()
  folders: Folder[];
  @Input()
  displayName: string;
  @Input()
  files: File[];
  @Output()
  clickedFolder = new EventEmitter<Folder>();
  @Output()
  clickedFile = new EventEmitter<File>();
  constructor() { }

  ngOnInit() {}

}
