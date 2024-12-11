import * as turf from '@turf/turf';

interface GeofenceConfig {
  center: [number, number];
  radiusMeters: number;
  toleranceMultiplier?: number;
}

export const checkGeofence = (
  userLat: number,
  userLon: number,
  config: GeofenceConfig
) => {
  // Round coordinates to reduce precision
  const roundedUserLat = Number(userLat.toFixed(3));
  const roundedUserLon = Number(userLon.toFixed(3));
  const roundedGeofenceLat = Number(config.center[0].toFixed(3));
  const roundedGeofenceLon = Number(config.center[1].toFixed(3));

  // Create points for calculation
  const userPoint = turf.point([roundedUserLat, roundedUserLon]);
  const geofencePoint = turf.point(config.center);

  // Calculate distance
  const distance = turf.distance(userPoint, geofencePoint, { units: 'meters' });

  // Apply tolerance multiplier
  const toleranceMultiplier = config.toleranceMultiplier || 1.2;
  const adjustedRadius = config.radiusMeters * toleranceMultiplier;

  return {
    inGeofence: distance <= adjustedRadius,
    distance,
    adjustedRadius,
  };
}; 