"use client";

import React, { useRef, useEffect, useState } from "react";
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
import Logo from "@/components/specials/logo";

const LocationPicker = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new Map({
      target: mapRef.current,
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

    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (!map) return;

    const vectorSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(markerLayer);

    map.on("click", (event) => {
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

    setTimeout(() => {
      map.updateSize(); // Haritanın boyutlarını güncelle
    }, 100);
  }, [map]);

  return (
    <div className="w-full h-dvh  flex flex-col justify-center items-center gap-4 ">
      <div className="flex flex-row items-center gap-2 font-bold mt-4">
        <div className="flex h-12 w-12 md:h-24 md:w-24 items-center justify-center rounded-md">
          <Logo className="" />
        </div>
        <span className="text-2xl md:text-6xl">RandevuCo</span>
      </div>
      <h1 className="text-xl md:text-4xl font-bold">
        Lütfen işletme lokasyonu seçiniz
      </h1>
      <div ref={mapRef} className="w-full h-[50rem] border-none "></div>
      {position && (
        <div className="mt-4">
          <p>Seçilen Konum:</p>
          <p>Enlem: {position.lat}</p>
          <p>Boylam: {position.lng}</p>
          <a
            href={`https://www.google.com/maps?q=${position.lat},${position.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Harita Linki
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
