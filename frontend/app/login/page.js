"use client";
import { useState, useEffect } from "react";
import Login from "@/components/Login";
import { getBrowserName } from "@/functions/getBrowserName";
import BrowserAlert from "@/components/Alerts/browserAlert";

export default function LoginPage() {
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
                <Login />
            )}
        </div>
    );
}
