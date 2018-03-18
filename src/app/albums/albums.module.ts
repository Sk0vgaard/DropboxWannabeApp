import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemModule } from '../file-system/file-system.module';
import { AlbumsListComponent } from './albums-list/albums-list.component';

@NgModule({
  imports: [
    CommonModule,
    FileSystemModule
  ],
  declarations: [AlbumsListComponent]
})
export class AlbumsModule { }
