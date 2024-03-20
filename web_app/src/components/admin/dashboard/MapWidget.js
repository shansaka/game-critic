import React, { useState } from "react";
import { Map, Source, Layer, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MapWidget = ({ reviews }) => {
  const geojson = {
    type: "FeatureCollection",
    features: reviews.map((review) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [review.location.lng, review.location.lat],
      },
      properties: {
        id: review.id,
      },
    })),
  };

  return (
    <div>
      <Card className="">
        <Card.Header>Reviews map</Card.Header>
        <Card.Body className="">
          <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            initialViewState={{
              longitude: -1.9118853570225107,
              latitude: 52.23858886609326,
              zoom: 6,
            }}
            style={{ width: "100%", height: "500px" }}
            mapStyle="mapbox://styles/mapbox/light-v10"
          >
            <NavigationControl showZoom position="top-right" />

            <Source
              id="reviews"
              type="geojson"
              data={geojson}
              cluster={true}
              clusterMaxZoom={14}
            >
              <Layer
                id="clusters"
                type="circle"
                source="reviews"
                filter={["has", "point_count"]}
                paint={{
                  "circle-color": "orange",
                  "circle-radius": [
                    "step",
                    ["get", "point_count"],
                    30,
                    100,
                    40,
                    750,
                    50,
                  ],
                  "circle-stroke-width": 2,
                  "circle-stroke-color": "#000",
                }}
              />
              <Layer
                id="cluster-count"
                type="symbol"
                source="reviews"
                filter={["has", "point_count"]}
                layout={{
                  "text-field": "{point_count_abbreviated}",
                  "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                  "text-size": 12,
                }}
              />
              <Layer
                id="unclustered-point"
                type="circle"
                source="reviews"
                filter={["!", ["has", "point_count"]]}
                paint={{
                  "circle-color": "#11b4da",
                  "circle-radius": 6,
                  "circle-stroke-width": 2,
                  "circle-stroke-color": "#000",
                }}
              />
            </Source>
          </Map>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MapWidget;
