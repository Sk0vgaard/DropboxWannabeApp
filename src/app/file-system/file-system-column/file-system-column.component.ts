import { Component, Input, OnInit } from '@angular/core';
import { FolderColumn } from '../shared/folder-column';
import { FileColumn } from '../shared/file-column';
import { Column } from '../shared/column';

@Component({
  selector: 'app-file-system-column',
  templateUrl: './file-system-column.component.html',
  styleUrls: ['./file-system-column.component.css']
})
export class FileSystemColumnComponent implements OnInit {

  // If Folder
  @Input()
  column: Column;
  folderColumn: FolderColumn;
  fileColumn: FileColumn;

  constructor() { }

  ngOnInit() {
    if ((this.column as FileColumn).url || (this.column as FileColumn).file) {
      this.fileColumn = this.column as FileColumn;
    } else {
      this.folderColumn = this.column as FolderColumn;
    }
  }

}
