export interface IpcBridge {
  openDataFileDialog: () => IpcImportBackupResponse;
}

export interface IpcImportBackupResponse {
  captured: number[];
  error: any;
}
