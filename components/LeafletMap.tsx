'use client';

import { useEffect, useRef, useState } from 'react';

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  connected?: boolean;
  onMapReady?: (map: any) => void;
}

// KSIT Default Location
const KSIT_LOCATION: [number, number] = [12.9073, 77.5650];

export default function LeafletMap({ 
  center = KSIT_LOCATION, 
  zoom = 15,
  connected = false,
  onMapReady 
}: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current || mapRef.current) return;

    // Dynamic import of Leaflet only on client side
    const loadMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Fix for default marker icons in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Initialize map with KSIT location
      const map = L.map(mapContainerRef.current as HTMLElement).setView(KSIT_LOCATION, zoom);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapRef.current = map;

      if (onMapReady) {
        onMapReady(map);
      }
    };

    loadMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, zoom, onMapReady]);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    const updateMap = async () => {
      const L = await import('leaflet');

      // Use provided center if connected, otherwise use KSIT default
      const targetCenter = connected ? center : KSIT_LOCATION;

      // Smoothly pan to new location
      mapRef.current.flyTo(targetCenter, zoom, {
        duration: 1.5
      });

      // Update or create marker
      if (markerRef.current) {
        markerRef.current.setLatLng(targetCenter);
      } else {
        const sarthiIcon = L.divIcon({
          className: 'sarthi-marker',
          html: `<div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);"></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        markerRef.current = L.marker(targetCenter, { icon: sarthiIcon }).addTo(mapRef.current);
      }
    };

    updateMap();
  }, [isClient, center, connected, zoom]);

  if (!isClient) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '300px', 
          borderRadius: '8px',
          backgroundColor: 'rgba(10, 10, 20, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} 
        className="rounded-lg"
      >
        <div className="text-gray-500 text-sm">Loading map...</div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        width: '100%', 
        height: '300px', 
        borderRadius: '8px' 
      }} 
      className="rounded-lg"
    />
  );
}
