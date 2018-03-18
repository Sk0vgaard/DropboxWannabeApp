export class Folder {
  name: string;
  owner: string;
  files: [{
    diplayName: string;
    uid: string;
  }];
  subFolders: [{
    name: string;
    uid: string;
  }];
}
