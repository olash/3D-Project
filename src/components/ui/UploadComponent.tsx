"use client";

import { useState } from "react";
import { parseSTL, calculateVolume } from "@/lib/geometry/stlParser";

export default function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const PRICE_PER_CM3 = 0.5; // $0.50 per cubic cm

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const arrayBuffer = await selectedFile.arrayBuffer();
    try {
      const geometry = parseSTL(arrayBuffer);
      const vol = calculateVolume(geometry);
      // Volume is usually in mm3, convert to cm3
      const volCm3 = vol / 1000;
      setVolume(volCm3);
      setPrice(volCm3 * PRICE_PER_CM3);
    } catch (err) {
      console.error("Failed to parse STL:", err);
    }
  };

  return (
    <div className="border border-border rounded-xl p-6 bg-card text-card-foreground">
      <h3 className="text-xl font-semibold mb-4">Upload Your STL</h3>
      <input 
        type="file" 
        accept=".stl" 
        onChange={handleFileUpload}
        className="mb-4 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-amber-700"
      />
      {volume !== null && price !== null && (
        <div className="mt-4 p-4 bg-background rounded-lg border border-border">
          <p className="text-sm text-gray-400">Estimated Volume: <span className="text-white font-medium">{volume.toFixed(2)} cm³</span></p>
          <p className="text-lg font-bold mt-2">Estimated Price: <span className="text-accent">${price.toFixed(2)}</span></p>
        </div>
      )}
    </div>
  );
}
