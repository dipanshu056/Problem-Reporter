import { useState } from "react";
import { PhotoUpload } from "../PhotoUpload";

export default function PhotoUploadExample() {
  const [photo, setPhoto] = useState<File | null>(null);

  return (
    <div className="max-w-2xl p-8 bg-background">
      <PhotoUpload
        onPhotoChange={(file) => {
          setPhoto(file);
          console.log("Photo changed:", file?.name);
        }}
      />
      {photo && (
        <p className="mt-4 text-sm text-muted-foreground">
          Selected: {photo.name}
        </p>
      )}
    </div>
  );
}
