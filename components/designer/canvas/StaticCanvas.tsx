import MeasurementLines from "./MeasurementLines";

export default function StaticCanvas() {
  return (
    <div className="relative">
      <MeasurementLines />
      <div
        className="relative border-2 border-black bg-[#4a4a4a]"
        style={{ width: 600, height: 400 }}
      >
        <div className="absolute inset-4 border border-dashed border-white/25" />
      </div>
    </div>
  );
}