import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotoUploadProps {
  onPhotoChange: (file: File | null) => void;
  initialPhoto?: string;
}

export function PhotoUpload({ onPhotoChange, initialPhoto }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialPhoto || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onPhotoChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onPhotoChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onPhotoChange(null);
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onPhotoChange(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (preview) {
    return (
      <Card className="relative overflow-hidden">
        <img
          src={preview}
          alt="Problem preview"
          className="w-full h-64 object-cover"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleRemove}
          data-testid="button-remove-photo"
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  return (
    <Card
      {...getRootProps()}
      className={`p-12 border-2 border-dashed cursor-pointer hover-elevate transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-border"
      }`}
      data-testid="dropzone-photo"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex gap-2">
          <div className="p-4 rounded-lg bg-muted">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <Camera className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        {isDragActive ? (
          <p className="text-lg font-medium">Drop the photo here</p>
        ) : (
          <>
            <div>
              <p className="text-lg font-medium mb-1">
                Drop a photo here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, WEBP up to 10MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleCameraCapture();
              }}
              className="gap-2"
              data-testid="button-camera-capture"
            >
              <Camera className="h-4 w-4" />
              Take Photo
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
