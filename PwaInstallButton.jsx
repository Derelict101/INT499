import { useEffect, useState } from "react";

function PwaInstallButton() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installStatus, setInstallStatus] = useState("StreamList can be installed when the browser offers the install prompt.");
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event) {
      event.preventDefault();
      setInstallPrompt(event);
      setInstallStatus("StreamList is ready to install on this device.");
    }

    function handleAppInstalled() {
      setIsInstalled(true);
      setInstallPrompt(null);
      setInstallStatus("StreamList has been installed successfully.");
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      setInstallStatus("StreamList is running as an installed application.");
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (!installPrompt) {
      setInstallStatus("Install is not available yet. Use Chrome or Edge on localhost or an HTTPS deployment.");
      return;
    }

    installPrompt.prompt();

    const choiceResult = await installPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setInstallStatus("The install prompt was accepted.");
    } else {
      setInstallStatus("The install prompt was dismissed.");
    }

    setInstallPrompt(null);
  }

  return (
    <section className="pwaPanel" aria-label="Progressive web app installation">
      <div>
        <p className="smallLabel">PWA Ready</p>
        <h2>Install StreamList</h2>
        <p>{installStatus}</p>
      </div>

      <button
        className="primaryButton"
        type="button"
        onClick={handleInstallClick}
        disabled={isInstalled}
      >
        <span className="material-symbols-outlined">
          {isInstalled ? "check_circle" : "install_desktop"}
        </span>
        {isInstalled ? "Installed" : "Install App"}
      </button>
    </section>
  );
}

export default PwaInstallButton;
