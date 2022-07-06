import L, { LeafletMouseEvent, LocationEvent } from 'leaflet';
import React, { useEffect } from 'react';
import Markers from './Markers';
import Circle from './Circle';
import { useDispatch, useSelector } from 'react-redux';
import { LocationMarker } from '../../common/constants/marker-icon-images';
import { selectMap, changeMapCenter } from './mapSlice';
import { uiActions } from '../../common/components/UI/uiSlice';

type MapProps = {
  map?: L.Map;
};

const Map = ({ map }: MapProps) => {
  const dispatch = useDispatch();
  const mapState = useSelector(selectMap);

  useEffect(() => {
    if (map) {
      const locationMarkerLayer = new L.LayerGroup();

      //have to set mapCenter manually instead of using getCenter()
      //getCenter() returns Position before click
      const handleMapClick = (event: LeafletMouseEvent) => {
        map.setView(event.latlng);
        dispatch(
          changeMapCenter({
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          }),
        );
        dispatch(uiActions.hideAll());
      };

      const handleDragEnd = () => {
        dispatch(
          changeMapCenter({
            lat: map.getCenter().lat,
            lng: map.getCenter().lng,
          }),
        );
      };

      const handleLocationFound = (event: LocationEvent) => {
        locationMarkerLayer.clearLayers();
        locationMarkerLayer.addLayer(new L.Marker(event.latlng, { icon: LocationMarker }));
        dispatch(
          changeMapCenter({
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          }),
        );
      };

      map.on('click', (event: LeafletMouseEvent) => handleMapClick(event));
      map.on('dragend', handleDragEnd);
      map.on('locationfound', (event: LocationEvent) => handleLocationFound(event));

      map.addLayer(locationMarkerLayer);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [dispatch, map]);

  useEffect(() => {
    if (map) {
      map.setView(mapState.mapCenter);
    }
  }, [map, mapState.mapCenter]);

  return (
    <>
      <Circle map={map} />
      <Markers map={map} />
    </>
  );
};

export default Map;
