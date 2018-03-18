import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadTask } from './upload-task';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {

  constructor(private afstorage: AngularFireStorage) { }

  upload(path: string, file: File): UploadTask {
    const task =  this.afstorage.upload(path, file);

    return {
      downloadUrl: task.downloadURL()
    };
  }

  // downloadUrl function for people not to know about the firestorage in any way.
  downloadUrlProfile(uid: string): Observable<any> {
    return this.afstorage.ref('profile-images/' + uid).getDownloadURL();
  }

}
