import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import QRCode from "qrcode.react";

export default function EventPhotoUploader() {
  const [eventName, setEventName] = useState("");
  const [uploadLink, setUploadLink] = useState("");
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setUploaded(false);
    setError("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select files to upload.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      // Simulate successful upload without actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUploaded(true);
    } catch (error) {
      setError("Simulated file upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateLink = () => {
    if (!eventName.trim()) {
      setError("Event name cannot be empty.");
      return;
    }

    setError("");
    const link = `${window.location.origin}/event/${encodeURIComponent(eventName)}`;
    setUploadLink(link);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Create Your Event Upload Page</h2>
          <Input
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Button onClick={handleGenerateLink}>Generate QR & Link</Button>

          {uploadLink && (
            <div className="text-center mt-4">
              <p className="text-sm font-semibold">Scan this QR or share the link:</p>
              <QRCode value={uploadLink} size={150} className="mx-auto my-2" />
              <p className="text-blue-600 underline break-all">{uploadLink}</p>
            </div>
          )}
          {error && <p className="text-red-600">{error}</p>}
        </CardContent>
      </Card>

      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Guest Photo Upload</h2>
          <Input type="file" multiple onChange={handleFileChange} />
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            {uploading ? "Uploading..." : <>
              <Upload className="w-4 h-4" /> Upload
            </>}
          </Button>
          {uploaded && <p className="text-green-600">Files uploaded successfully! (Simulated)</p>}
          {error && <p className="text-red-600">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
