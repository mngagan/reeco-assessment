import React, { useState, useEffect } from 'react'

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        windowHeight: undefined,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default useWindowSize