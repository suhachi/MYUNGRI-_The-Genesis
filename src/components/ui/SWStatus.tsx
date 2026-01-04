import React, { useEffect, useState } from 'react';

export const SWStatus: React.FC = () => {
    const [status, setStatus] = useState<string>('Unregistered');
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        if (!('serviceWorker' in navigator)) {
            setStatus("Not Supported");
            return;
        }

        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) {
                if (reg.active) {
                    const scope = reg.scope.split('/').pop() || 'root';
                    const ctrl = navigator.serviceWorker.controller ? 'Ctrl' : 'No-Ctrl';
                    setStatus(`Active (${scope}, ${ctrl})`);
                }
                else if (reg.installing) setStatus("Installing");
                else if (reg.waiting) setStatus("Waiting");
                else setStatus("Registered");

                // Update available detection
                if (reg.waiting) setUpdateAvailable(true);

                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setUpdateAvailable(true);
                            }
                        };
                    }
                };
            } else {
                setStatus("Unregistered");
            }
        });
    }, []);

    return (
        <span style={{ marginLeft: '10px' }} title="Service Worker Status (Scope, Controller)">
            SW: {status}
            {updateAvailable && <strong style={{ color: 'orange', marginLeft: '5px', cursor: 'pointer' }} onClick={() => window.location.reload()}> (UPDATE READY - Click to reload)</strong>}
        </span>
    );
};
