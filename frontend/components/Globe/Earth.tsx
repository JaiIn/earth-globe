"use client";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface EarthProps {
    isNight: boolean  
}

export default function Earth({ isNight }: EarthProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [transitionProgress, setTransitionProgress] = useState(0);
    
    const dayTexture = useLoader(TextureLoader, '/textures/earth_day.jpg')
    const nightTexture = useLoader(TextureLoader, '/textures/earth_night.jpg')

    useFrame((state, delta) => {
        const target = isNight ? 1 : 0;
        setTransitionProgress((prev) => {
            const newProgress = THREE.MathUtils.lerp(prev, target, delta * 2); 
            return Math.abs(newProgress - target) < 0.01 ? target : newProgress;
        });
    });

    useFrame((state, delta) => {
        if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.08 
        }
    })

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                dayTexture: { value: dayTexture },
                nightTexture: { value: nightTexture },
                transition: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D dayTexture;
                uniform sampler2D nightTexture;
                uniform float transition;
                varying vec2 vUv;
                
                void main() {
                    vec4 dayColor = texture2D(dayTexture, vUv);
                    vec4 nightColor = texture2D(nightTexture, vUv);
                    
                    vec4 finalColor = mix(dayColor, nightColor, transition);
                    
                    if (transition > 0.1) {
                        float cityLights = dot(nightColor.rgb, vec3(0.299, 0.587, 0.114));
                        if (cityLights > 0.2) {
                            finalColor.rgb += nightColor.rgb * 3.0 * transition;
                        }
                    }
                    
                    gl_FragColor = finalColor;
                }
            `
        });
    }, [dayTexture, nightTexture]);

    useEffect(() => {
        if (material.uniforms) {
            material.uniforms.transition.value = transitionProgress;
        }
    }, [transitionProgress, material]);

    return (
        <mesh ref={meshRef} material={material}>
            <sphereGeometry args={[1, 64, 32]} />
        </mesh>
    );
}