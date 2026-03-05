import { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { loadTrianglesPreset } from "tsparticles-preset-triangles";

interface TrianglesParticlesProps {
    className: string;
    backgroundColor: string;
}

function TrianglesParticles({ className, backgroundColor }: TrianglesParticlesProps) {

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log(container);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
        await loadTrianglesPreset(engine);
    }, []);

    const options = useMemo(() => {
        return {
            detectRetina: true,
            fpsLimit: 30,
            background: {
                position: "50% 50%",
                repeat: "no-repeat",
                size: "cover",
                color: `${backgroundColor}`,
                opacity: 1
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    resize: true
                }
            },
            particles: {
                color: {
                    value: "#fff"
                },
                links: {
                    value: "#fff",
                    width: 2,
                    distance: 200,
                    opacity: 0.5,
                    enable: true
                },
                number: {
                    value: 20
                },
                opacity: {
                    random: {
                        enable: false
                    },
                    value: 1
                },
                size: {
                    value: 4,
                    animation: {
                        enable: true,
                        minimumValue: 0.5,
                        speed: 10
                    },
                    random: {
                        enable: true
                    }
                },
                collisions: {
                    enable: false,
                },
                move: {
                    speed: 1,
                    enable: true,
                    outMode: "bounce"
                }
            }
        };
    }, []);

    const [isMobileView, setIsMobileView] = useState(false);

    const updateIsMobileView = () => {
        if (window.innerWidth < 600) {
            setIsMobileView(true);
        } else {
            setIsMobileView(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateIsMobileView);
    })

    return (
        <Particles className={className} init={particlesInit} loaded={particlesLoaded} options={{
            detectRetina: true,
            fullScreen: {
                enable: false,
                zIndex: 0
            },
            fpsLimit: 120,
            background: {
                position: "50% 50%",
                repeat: "no-repeat",
                size: "cover",
                color: `${backgroundColor}`,
                opacity: 1
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    resize: true
                }
            },
            particles: {
                color: {
                    value: "#fff"
                },
                links: {
                    value: "#fff",
                    width: 2,
                    distance: 200,
                    opacity: 0.5,
                    enable: true,
                    triangles: {
                        enable: false,
                        opacity: 0.4,
                        width: 0.5,

                    }
                },
                number: {
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                    value: isMobileView ? 15 : 40,
                },
                opacity: {
                    random: false,
                    value: 1
                },
                size: {
                    value: 4,
                    animation: {
                        enable: true,
                        minimumValue: 0.5,
                        speed: 10
                    },
                    random: false
                },
                collisions: {
                    enable: false,
                },
                move: {
                    speed: 1,
                    enable: true,
                    outMode: "bounce",
                    direction: 'none',
                    random: false,
                    straight: false,
                },
            }
        }} />
    );
}

export default TrianglesParticles;

{/* {
            particles: {
                links: {
                    distance: 200,
                    opacity: 0.5,
                    enable: true,
                    width: 2,
                    color: '#c7c7c7ab',
                    triangles: {
                        enable: false,
                        opacity: 0.4,
                        width: 2,
                    },
                },
                number: {
                    value: 40
                },
                collisions: {
                    enable: true,
                },
                move: {
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: { min: 1, max: 1.5 },
                    straight: false,
                },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: "random",
                    opacity: 0.4,
                    width: 1,
                    triangles: {
                        enable: true,
                        color: "#ffffff",
                        opacity: 0.1
                    }
                },
            },
            fpsLimit: 120,
            detectRetina: true,
            background: {
                color: `${backgroundColor}`
            },
            fullScreen: {
                enable: false,
                zIndex: 0
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    resize: true
                }
            }
        }*/}