"use client";
import Register from "@/components/Register";
import { useEffect, useState } from "react";
import { getBrowserName } from "@/functions/getBrowserName";
import BrowserAlert from "@/components/Alerts/browserAlert";

export default function Home() {
    // check browser and render message if user is using Safari
    const [browser, setBrowser] = useState();

    useEffect(() => {
        const browserName = getBrowserName(navigator.userAgent);
        setBrowser(browserName);
    }, []);

    return (
        <div>
            {browser === "Apple Safari" ? (
                <BrowserAlert browser={browser} />
            ) : (
                <Register />
            )}
        </div>
    );
}
