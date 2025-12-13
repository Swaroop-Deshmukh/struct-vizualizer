import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapProps {
  pickupLocation?: { lat: number; lng: number; address?: string } | null;
  dropoffLocation?: { lat: number; lng: number; address?: string } | null;
  onPickupSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDropoffSelect?: (location: { lat: number; lng: number; address: string }) => void;
  showRoute?: boolean;
  driverLocation?: { lat: number; lng: number } | null;
  className?: string;
  selectMode?: "pickup" | "dropoff" | null;
}

const carIcon = L.divIcon({
  className: "car-marker",
  html: `<div style="width: 32px; height: 32px; background: #14b8a6; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8c-.3.5-.1 1.1.4 1.4.5.3 1.1.1 1.4-.4L4.5 10H12c.3 0 .6.1.8.4l1.5 1.8c.2.2.5.3.7.3h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const pickupIcon = L.divIcon({
  className: "pickup-marker",
  html: `<div style="width: 28px; height: 28px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 3px solid white;">
    <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const dropoffIcon = L.divIcon({
  className: "dropoff-marker",
  html: `<div style="width: 28px; height: 28px; background: #f97316; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 3px solid white;">
    <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export default function Map({
  pickupLocation,
  dropoffLocation,
  onPickupSelect,
  onDropoffSelect,
  showRoute = false,
  driverLocation,
  className = "",
  selectMode,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const pickupMarker = useRef<L.Marker | null>(null);
  const dropoffMarker = useRef<L.Marker | null>(null);
  const driverMarker = useRef<L.Marker | null>(null);
  const routeLayer = useRef<L.Polyline | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const selectModeRef = useRef(selectMode);
  const onPickupSelectRef = useRef(onPickupSelect);
  const onDropoffSelectRef = useRef(onDropoffSelect);

  // Keep refs updated
  useEffect(() => {
    selectModeRef.current = selectMode;
    onPickupSelectRef.current = onPickupSelect;
    onDropoffSelectRef.current = onDropoffSelect;
  }, [selectMode, onPickupSelect, onDropoffSelect]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
          setUserLocation({ lat: 20.5937, lng: 78.9629 });
        }
      );
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const defaultCenter = userLocation || { lat: 20.5937, lng: 78.9629 };
    
    map.current = L.map(mapContainer.current, {
      center: [defaultCenter.lat, defaultCenter.lng],
      zoom: userLocation ? 14 : 5,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.current);

    L.control.zoom({ position: "topright" }).addTo(map.current);

    // Map click handler using refs for current values
    map.current.on("click", async (e: L.LeafletMouseEvent) => {
      const currentSelectMode = selectModeRef.current;
      const currentOnPickupSelect = onPickupSelectRef.current;
      const currentOnDropoffSelect = onDropoffSelectRef.current;

      if (!currentSelectMode) return;

      const { lat, lng } = e.latlng;
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        if (currentSelectMode === "pickup" && currentOnPickupSelect) {
          currentOnPickupSelect({ lat, lng, address });
        } else if (currentSelectMode === "dropoff" && currentOnDropoffSelect) {
          currentOnDropoffSelect({ lat, lng, address });
        }
      } catch (error) {
        const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        if (currentSelectMode === "pickup" && currentOnPickupSelect) {
          currentOnPickupSelect({ lat, lng, address });
        } else if (currentSelectMode === "dropoff" && currentOnDropoffSelect) {
          currentOnDropoffSelect({ lat, lng, address });
        }
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [userLocation]);

  // Update cursor based on select mode
  useEffect(() => {
    if (!mapContainer.current) return;
    mapContainer.current.style.cursor = selectMode ? "crosshair" : "grab";
  }, [selectMode]);

  // Center map on user location when available
  useEffect(() => {
    if (map.current && userLocation && !pickupLocation && !dropoffLocation) {
      map.current.setView([userLocation.lat, userLocation.lng], 14);
    }
  }, [userLocation, pickupLocation, dropoffLocation]);

  // Update pickup marker
  useEffect(() => {
    if (!map.current) return;

    if (pickupMarker.current) {
      map.current.removeLayer(pickupMarker.current);
      pickupMarker.current = null;
    }

    if (pickupLocation) {
      pickupMarker.current = L.marker([pickupLocation.lat, pickupLocation.lng], {
        icon: pickupIcon,
      })
        .addTo(map.current)
        .bindPopup(`<b>Pickup</b><br>${pickupLocation.address || "Selected location"}`);
      
      map.current.setView([pickupLocation.lat, pickupLocation.lng], 14);
    }
  }, [pickupLocation]);

  // Update dropoff marker
  useEffect(() => {
    if (!map.current) return;

    if (dropoffMarker.current) {
      map.current.removeLayer(dropoffMarker.current);
      dropoffMarker.current = null;
    }

    if (dropoffLocation) {
      dropoffMarker.current = L.marker([dropoffLocation.lat, dropoffLocation.lng], {
        icon: dropoffIcon,
      })
        .addTo(map.current)
        .bindPopup(`<b>Drop-off</b><br>${dropoffLocation.address || "Selected location"}`);
    }
  }, [dropoffLocation]);

  // Update driver marker
  useEffect(() => {
    if (!map.current) return;

    if (driverMarker.current) {
      map.current.removeLayer(driverMarker.current);
      driverMarker.current = null;
    }

    if (driverLocation) {
      driverMarker.current = L.marker([driverLocation.lat, driverLocation.lng], {
        icon: carIcon,
      })
        .addTo(map.current)
        .bindPopup("Driver location");
    }
  }, [driverLocation]);

  // Draw route between pickup and dropoff
  useEffect(() => {
    if (!map.current) return;

    if (routeLayer.current) {
      map.current.removeLayer(routeLayer.current);
      routeLayer.current = null;
    }

    if (showRoute && pickupLocation && dropoffLocation) {
      const fetchRoute = async () => {
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${pickupLocation.lng},${pickupLocation.lat};${dropoffLocation.lng},${dropoffLocation.lat}?overview=full&geometries=geojson`
          );
          const data = await response.json();

          if (data.routes && data.routes.length > 0 && map.current) {
            const coordinates = data.routes[0].geometry.coordinates.map(
              (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
            );

            routeLayer.current = L.polyline(coordinates, {
              color: "#14b8a6",
              weight: 5,
              opacity: 0.8,
            }).addTo(map.current);

            const bounds = L.latLngBounds([
              [pickupLocation.lat, pickupLocation.lng],
              [dropoffLocation.lat, dropoffLocation.lng],
            ]);
            map.current.fitBounds(bounds, { padding: [50, 50] });
          }
        } catch (error) {
          console.error("Failed to fetch route:", error);
          if (map.current) {
            routeLayer.current = L.polyline(
              [
                [pickupLocation.lat, pickupLocation.lng],
                [dropoffLocation.lat, dropoffLocation.lng],
              ],
              {
                color: "#14b8a6",
                weight: 4,
                opacity: 0.7,
                dashArray: "10, 10",
              }
            ).addTo(map.current);

            const bounds = L.latLngBounds([
              [pickupLocation.lat, pickupLocation.lng],
              [dropoffLocation.lat, dropoffLocation.lng],
            ]);
            map.current.fitBounds(bounds, { padding: [50, 50] });
          }
        }
      };

      fetchRoute();
    }
  }, [showRoute, pickupLocation, dropoffLocation]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-xl" />
      {selectMode && (
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-border z-[1000]">
          <p className="text-sm font-medium text-foreground">
            Click on the map to select {selectMode === "pickup" ? "pickup" : "drop-off"} location
          </p>
        </div>
      )}
    </div>
  );
}
