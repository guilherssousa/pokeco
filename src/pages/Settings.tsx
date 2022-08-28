import React from "react";
import styles from "styles/app.module.scss";

import Button from "@/components/Button";

import useDex from "@/hooks/useDex";

import { IpcBridge, IpcImportBackupResponse } from "@/types/IpcBridge";

const Settings: React.FC = () => {
  const { captured, cleanCaptured, importCaptured } = useDex();

  const handleImportDataToPokeco = async () => {
    const { pokecoNodeAPI } = window as any;
    const pna = pokecoNodeAPI as IpcBridge;

    const { errorMessage, ...data } = await pna.openDataFileDialog();

    if (errorMessage as any) {
      return;
    }

    const validPropsToImport = ["captured"];

    const isDataValid = validPropsToImport.every((prop) =>
      data.hasOwnProperty(prop)
    );

    if (!isDataValid) {
      return;
    }

    const { captured: capturedToImport } = data as IpcImportBackupResponse;

    importCaptured(capturedToImport);
  };

  const handleExportDataAsJson = () => {
    const data = {
      captured,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const name = `pokeco_userdata_${new Date().toISOString()}.json`;

    link.download = name;
    link.click();
  };

  const cleanUserData = () => {
    cleanCaptured();
  };

  return (
    <main className={styles.appHeader}>
      <h2 className={styles.pageTitle}>Settings</h2>

      <div className={styles.settingOption}>
        <div>
          <h3 className={styles.pageHeading3}>Import User data</h3>
          <p>Import data from JSON file backups to your Pokéco.</p>
        </div>
        <Button onClick={handleImportDataToPokeco}>Import JSON file</Button>
      </div>

      <div className={styles.settingOption}>
        <div>
          <h3 className={styles.pageHeading3}>Export all data</h3>
          <p>Export all your saved data as JSON.</p>
        </div>
        <Button onClick={handleExportDataAsJson}>Export as JSON</Button>
      </div>

      <div className={styles.settingOption}>
        <div>
          <h3 className={styles.pageHeading3}>Clean all User data</h3>
          <p>
            Delete all data collected by the user. It is highly recommendded to
            backup your data before doing this.
          </p>
        </div>
        <Button onClick={cleanUserData}>Clean User Data</Button>
      </div>
    </main>
  );
};

export default Settings;
