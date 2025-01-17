"use client";
import { useRef, useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationPickerProps {
  setPosition: (position: { lat: number; lng: number } | null) => void;
}

const LocationPicker = ({ setPosition }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return; // Eğer mapRef.current null ise işlemi durdur

    const targetElement = mapRef.current; // mapRef.current'i bir değişkende sakla

    const initialMap = new Map({
      target: targetElement, // null olamayacağından emin olduğumuz değişkeni kullan
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([32.85411, 39.92077]),
        zoom: 6,
      }),
    });

    const vectorSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    initialMap.addLayer(markerLayer);

    initialMap.on("click", (event) => {
      const coords = toLonLat(event.coordinate);
      const [lng, lat] = coords;
      setPosition({ lat, lng });

      vectorSource.clear();
      const marker = new Feature({
        geometry: new Point(event.coordinate),
      });
      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
          }),
        })
      );
      vectorSource.addFeature(marker);
    });

    setMap(initialMap);

    return () => {
      initialMap.setTarget(undefined); // Temizlik işlemleri
    };
  }, [mapRef, setPosition]);


  return (
    <Card className="overflow-hidden w-full h-full shadow-lg">
      <div className="p-6 pb-0">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-primary" />
          Lütfen işletme lokasyonu seçiniz
        </h2>
      </div>
      <div className="relative mt-4 h-[30rem] lg:h-[40rem] w-full">
        <div ref={mapRef} className="absolute inset-0 mt-4 h-[30rem] lg:h-[40rem] w-full border-0"></div>
      </div>
    </Card>
  );
};

export default LocationPicker;
