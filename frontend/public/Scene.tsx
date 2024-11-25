/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 scene.gltf 
Author: Danylo Tyupa (https://sketchfab.com/danzl0)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/security-camera-e0657ce75f374f1e911e00f710046572
Title: Security camera
*/

import { useGLTF } from "@react-three/drei";

export default function Model(props: any) {
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.defaultMaterial.geometry} material={materials.DefaultMaterial} rotation={[Math.PI / 2, 0, 0]} scale={2.2} />
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
