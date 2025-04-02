"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Text } from "@react-three/drei"
import * as THREE from "three"

interface MapSceneProps {
  isNavigating: boolean
  destination: string
}

export function MapScene({ isNavigating, destination }: MapSceneProps) {
  const floorRef = useRef<THREE.Mesh>(null)
  const wallsRef = useRef<THREE.Group>(null)
  const pathRef = useRef<THREE.Mesh>(null)

  // Create a path when navigation starts
  useEffect(() => {
    if (isNavigating && pathRef.current) {
      // Animate path appearance
      const material = pathRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0

      const animate = () => {
        if (material.opacity < 1) {
          material.opacity += 0.02
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }, [isNavigating])

  // Pulse effect for walls when navigating
  useFrame((state, delta) => {
    if (isNavigating && wallsRef.current) {
      wallsRef.current.children.forEach((wall: THREE.Mesh) => {
        const material = wall.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      })
    }
  })

  return (
    <>
      {/* Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111827" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Grid lines */}
      <gridHelper args={[20, 20, "#2d3748", "#2d3748"]} position={[0, 0, 0]} />

      {/* Walls */}
      <group ref={wallsRef}>
        {/* Outer walls */}
        <Box args={[20, 3, 0.2]} position={[0, 1.5, 10]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>
        <Box args={[20, 3, 0.2]} position={[0, 1.5, -10]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>
        <Box args={[0.2, 3, 20]} position={[10, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>
        <Box args={[0.2, 3, 20]} position={[-10, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>

        {/* Inner walls */}
        <Box args={[8, 3, 0.2]} position={[-2, 1.5, 5]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>
        <Box args={[0.2, 3, 10]} position={[4, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>
        <Box args={[10, 3, 0.2]} position={[-5, 1.5, -3]} castShadow>
          <meshStandardMaterial color="#1e293b" emissive="#312e81" emissiveIntensity={0.2} transparent opacity={0.9} />
        </Box>
      </group>

      {/* Room labels */}
      <Text position={[-7, 0.1, 7]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.5} color="#94a3b8">
        Main Entrance
      </Text>

      <Text position={[7, 0.1, 7]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.5} color="#94a3b8">
        Conference Room A
      </Text>

      <Text position={[7, 0.1, -7]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.5} color="#94a3b8">
        IT Department
      </Text>

      <Text position={[-7, 0.1, -7]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.5} color="#94a3b8">
        Cafeteria
      </Text>

      {/* Navigation path - only visible when navigating */}
      {isNavigating && (
        <mesh ref={pathRef} position={[0, 0.02, 0]}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(-7, 0, 7), // Start point
                new THREE.Vector3(-7, 0, 0),
                new THREE.Vector3(-2, 0, 0),
                new THREE.Vector3(-2, 0, -7),
                new THREE.Vector3(7, 0, -7), // End point (IT Department)
              ]),
              64, // tubular segments
              0.1, // radius
              8, // radial segments
              false, // closed
            ]}
          />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Destination marker - only visible when navigating */}
      {isNavigating && (
        <group position={[7, 0, -7]}>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.1, 0.5, 2, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
          </mesh>
          <pointLight position={[0, 1, 0]} color="#3b82f6" intensity={1} distance={3} />
        </group>
      )}
    </>
  )
}

