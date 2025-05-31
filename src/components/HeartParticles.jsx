import { useEffect, useState } from 'react';

const settings = {
    particleGap: 2,
    particleSize: 1,
    mouseForce: 100,
    noise: 10,
    layerCount: 3,
    layerDistance: 4,
};

export default function HeartParticles({ imageSrc }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const imageElement = document.querySelector('#valentines');

        if (imageElement && imageLoaded && window.NextParticle) {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const heart = new window.NextParticle({
                renderer: 'webgl',
                image: imageElement,
                width,
                height,
                particleGap: settings.particleGap,
                particleSize: settings.particleSize,
                mouseForce: settings.mouseForce,
                noise: settings.noise,
                layerCount: settings.layerCount,
                layerDistance: settings.layerDistance,
            });

            return () => {
                if (heart && heart.dispose) heart.dispose();
            };
        }
    }, [imageLoaded, imageSrc]);


    const handleImageLoad = () => {
        setImageLoaded(true); // La imagen se ha cargado
    };

    return (
        <>
            <canvas
                id="next-particle-canvas"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                }}
            />

            <img
                id="valentines"
                src={imageSrc}
                alt="Heart"
                onLoad={handleImageLoad}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    visibility: 'hidden',
                    pointerEvents: 'none',
                }}
            />



        </>
    );
}
