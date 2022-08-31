import { app, BrowserWindow, shell, ipcMain, dialog } from "electron";
import { release } from "os";
import { readFileSync } from "fs";
import { join } from "path";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Pokéco",
    icon: join(ROOT_PATH.public, "favicon.svg"),
    autoHideMenuBar: true,
    webPreferences: {
      preload,
      nodeIntegration: true,
      devTools: true,
    },
    width: 1200,
    minWidth: 1000,
    maxWidth: 1200,
    minHeight: 800,
  });

  ipcMain.handle("open-data-file-dialog", async () => {
    try {
      const { filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "JSON", extensions: ["json"] }],
      });

      const [filePath] = filePaths;

      // open, read and parse the filepaths
      const data = JSON.parse(readFileSync(filePath, "utf8"));

      return data;
    } catch (error) {
      return {
        errorMessage: error,
      };
    }
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
