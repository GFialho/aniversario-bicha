"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function Confetti() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window;
        setDimensions({ width, height });

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000); // Show confetti for 10 seconds

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, []);

    return showConfetti ? (
        <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={true}
            numberOfPieces={200}
            colors={["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#0000ff", "#8000ff"]}
        />
    ) : null;
} 