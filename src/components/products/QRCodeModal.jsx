import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";

const QRCodeModal = ({ open, onClose, product, storeSlug, storeLogo }) => {
  const canvasRef = useRef(null);

  const productUrl = `${window.location.origin}/store/${storeSlug}/product/${product?.id}`;

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas"); // 👈 IMPORTANT
    if (!canvas) {
      toast.error("Something went wrong! Please try again later")
      return;
    }

    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = `${product.name}-qr.png`;
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <QrCode className="w-5 h-5 text-primary" />
            Product QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 py-2">
          {/* Product name */}
          <p className="text-sm text-muted-foreground text-center line-clamp-2 max-w-[220px]">
            {product?.name}
          </p>

          {/* QR Code */}
          <div ref={canvasRef} className="p-4 bg-white rounded-xl shadow-lg">
            <QRCodeCanvas
              id="canvas"
              value={productUrl}
              size={200}
              bgColor="#ffffff"
              fgColor="#0a0a0f"
              level="H"
              includeMargin={false}
              imageSettings={
                storeLogo
                  ? {
                    src: storeLogo,
                    height: 40,
                    width: 40,
                    excavate: true,
                    crossOrigin: "anonymous"
                  }
                  : undefined
              }
            />
          </div>

          {/* Logo attribution */}
          {storeLogo && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Store logo embedded in QR
            </p>
          )}

          {/* URL preview */}
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-primary hover:underline break-all text-center max-w-[240px]"
          >
            <ExternalLink className="w-3 h-3 shrink-0" />
            <span className="truncate">{productUrl}</span>
          </a>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
