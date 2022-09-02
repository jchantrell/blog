import ReactLoading from "react-loading";
import themeLoader from "../utils/theme";
import { useEffect, useState } from "react";

function LoadScreen() {
  const [bgColor, setBgColor] = useState<string>("");
  const [spinColor, setSpinColor] = useState<string>("");
  useEffect(() => {
    let theme = themeLoader();
    setBgColor(theme!.bgColor);
    setSpinColor(theme!.spinColor);
  }, []);
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className="flex justify-center items-center absolute inset-0 h-screen w-screen z-10"
    >
      <ReactLoading type="cylon" color={spinColor} height={100} width={100} />
    </div>
  );
}

export default LoadScreen;
