import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Overlay, Modal, Title, CropArea, SliderWrapper, SliderLabel, Slider, Footer, CancelButton, SaveButton } from "./style";

interface Props {
  imageSrc: string;
  onCancel: () => void;
  onSave: (file: File) => void;
  aspect?: number;
  cropShape?: "round" | "rect";
  title?: string;
}

async function getCroppedFile(imageSrc: string, croppedArea: Area, maxWidth: number, maxHeight: number): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = imageSrc;
  });

  const scale = Math.min(1, maxWidth / croppedArea.width, maxHeight / croppedArea.height);
  const outW = Math.round(croppedArea.width * scale);
  const outH = Math.round(croppedArea.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    croppedArea.x, croppedArea.y,
    croppedArea.width, croppedArea.height,
    0, 0,
    outW, outH
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob!], "avatar.jpg", { type: "image/jpeg" }));
    }, "image/jpeg", 0.85);
  });
}

const AvatarCropModal = ({ imageSrc, onCancel, onSave, aspect = 1, cropShape = "round", title = "Ajustar foto de perfil" }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedArea) return;
    const isBanner = aspect !== 1;
    const file = await getCroppedFile(imageSrc, croppedArea, isBanner ? 1200 : 400, isBanner ? 400 : 400);
    onSave(file);
  };

  return (
    <Overlay>
      <Modal>
        <Title>{title}</Title>
        <CropArea>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </CropArea>
        <SliderWrapper>
          <SliderLabel>Zoom</SliderLabel>
          <Slider
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </SliderWrapper>
        <Footer>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <SaveButton onClick={handleSave}>Usar esta foto</SaveButton>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default AvatarCropModal;
