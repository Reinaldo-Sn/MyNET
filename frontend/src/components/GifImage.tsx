import { useState, ComponentType, ImgHTMLAttributes } from "react";

interface Props {
  src: string;
  Img: ComponentType<ImgHTMLAttributes<HTMLImageElement>>;
}

const GifImage = ({ src, Img }: Props) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <span style={{ fontSize: "0.78rem", opacity: 0.45 }}>gif</span>;
  return <Img src={src} alt="gif" onError={() => setFailed(true)} />;
};

export default GifImage;
