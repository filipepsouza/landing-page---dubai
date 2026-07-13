import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"

export function ParticleSphere() {
  const PARTICLE_COUNT = 1500 
  const PARTICLE_SIZE_MIN = 0.005
  const PARTICLE_SIZE_MAX = 0.015
  const SPHERE_RADIUS = 9
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.001
  const PARTICLE_OPACITY = 1

  const groupRef = useRef<THREE.Group>(null)

  const tags = [
    "ESTRUTURA", "MOTOR", "WPS", "ALAVANCAGEM", 
    "RESIDÊNCIA", "CRÉDITO", "BLINDAGEM", "MAINLAND", "ACESSO",
    "ESTRUTURA", "MOTOR", "WPS", "ALAVANCAGEM", 
    "RESIDÊNCIA", "CRÉDITO", "BLINDAGEM", "MAINLAND", "ACESSO"
  ]

  const particles = useMemo(() => {
    const particles = []
    const colorGold = new THREE.Color("#12A56B")
    const colorDarkGold = new THREE.Color("#A88A2B")
    const colorWhite = new THREE.Color("#FFFFFF")

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
      
      const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS
      
      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

      const particleColor = new THREE.Color().lerpColors(colorDarkGold, colorGold, Math.random())
      if (Math.random() > 0.95) {
        particleColor.lerp(colorWhite, 0.8)
      }

      particles.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: particleColor,
      })
    }
    return particles
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  const orbitingTags = useMemo(() => {
    const items = []
    const TAG_COUNT = tags.length
    
    for (let i = 0; i < TAG_COUNT; i++) {
      // Distribuição ao redor da esfera
      const angle = (i / TAG_COUNT) * Math.PI * 2
      const x = (SPHERE_RADIUS + 1) * Math.cos(angle)
      const y = (Math.random() - 0.5) * 6 // Variação de altura
      const z = (SPHERE_RADIUS + 1) * Math.sin(angle)

      // Rotação para o texto ficar voltado para quem olha a esfera, 
      // ou acompanhando a curva. Tangente ao círculo é melhor.
      const rotY = -angle - Math.PI / 2

      items.push({
        position: [x, y, z] as [number, number, number],
        rotation: [0, rotY, 0] as [number, number, number],
        text: tags[i],
      })
    }
    return items
  }, [SPHERE_RADIUS]) // 'tags' is constant outside hook conceptually, but we can leave it out of deps since it's local constant

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {orbitingTags.map((tag, index) => (
        <Text
          key={`tag-${index}`}
          position={tag.position}
          rotation={tag.rotation}
          fontSize={0.4}
          color="#12A56B"
          fillOpacity={0.6}
          letterSpacing={0.15}
          outlineWidth={0.01}
          outlineColor="#030303"
        >
          {tag.text}
        </Text>
      ))}
    </group>
  )
}
