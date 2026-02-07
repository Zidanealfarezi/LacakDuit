import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage("fadeOut");
        }
    }, [location, displayLocation]);

    const handleAnimationEnd = () => {
        if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
        }
    };

    return (
        <div
            className={`animate-slide-up ${transitionStage === "fadeOut" ? "opacity-0" : "opacity-100"}`}
            onAnimationEnd={handleAnimationEnd}
        >
            {children}
        </div>
    );
}
