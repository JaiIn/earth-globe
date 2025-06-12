import React, { useRef } from 'react'
import * as THREE from 'three'

export default function Atmosphere() {
    
    const atmosphereRef = useRef<THREE.Mesh>(null)
    
    const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
        c: { value: 1.0 },
        p: { value: 1.4 }
        },
        vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragmentShader: `
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        void main() {
            float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
            gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0) * intensity;
        }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    })

    return (
        <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[1.03, 64, 32]} />
        </mesh>
    )
}
