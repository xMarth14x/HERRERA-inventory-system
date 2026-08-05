import { BarcodeWorkbench } from "@/components/barcode/barcode-workbench";
import { BarcodeFeatureLinks } from "@/components/barcode/barcode-feature-links";
import { barcodeSupportContent } from "@/lib/module-content";

export default function BarcodeSupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{barcodeSupportContent.title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{barcodeSupportContent.description}</p>
      </div>

      <BarcodeWorkbench />

      <BarcodeFeatureLinks />
    </div>
  );
}
