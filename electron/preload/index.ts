const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pokecoNodeAPI", {
  openDataFileDialog: async () =>
    await ipcRenderer.invoke("open-data-file-dialog"),
});

export {};
