import "./header.scss";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Scene from "../../../public/Scene";


const Header = () => {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Scene position={[0, -1, 0]} />
      </Suspense>
      <Environment preset="sunset" />
      <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={50} blur={2} far={10} resolution={256} color="#000000" />
    </Canvas>
  );
};

export default Header;
