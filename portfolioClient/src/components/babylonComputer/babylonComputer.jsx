import { useEffect, useRef } from "react";
import { Suspense } from "react";
import { initializeBabylon } from "./initializeBabylon";
import BabylonLoader from "./babylonLoader";

const Computers = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const initBabylon = async () => {
      if (canvasRef.current) {
        await initializeBabylon(canvasRef, engineRef);
      }
    };
    initBabylon();
  }, []);

  return (
    <Suspense fallback={<BabylonLoader />}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "all",
        }}
      />
    </Suspense>
  );
};

export default Computers;
