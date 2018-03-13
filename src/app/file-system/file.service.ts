import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadTask } from './upload-task';

@Injectable()
export class FileService {

  constructor(private afstorage: AngularFireStorage) { }

  upload(path: string, file: File): UploadTask {
    const task =  this.afstorage.upload(path, file);

    return {
      downloadUrl: task.downloadURL()
    };
  }

}
