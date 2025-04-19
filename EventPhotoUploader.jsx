
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

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    // Simulate upload to server (You can connect this to Firebase or another backend)
    setUploaded(true);
  };

  const handleGenerateLink = () => {
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
        </CardContent>
      </Card>

      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Guest Photo Upload</h2>
          <Input type="file" multiple onChange={handleFileChange} />
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload
          </Button>
          {uploaded && <p className="text-green-600">Files uploaded successfully!</p>}
        </CardContent>
      </Card>
    </div>
  );
}
