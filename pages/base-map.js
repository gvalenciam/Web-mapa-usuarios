import React from "react";
import mapboxgl from "mapbox-gl";
import json from "../public/test.json";

import Link from "next/link";
import Head from "next/head";

import BaseMapSidebar from "../components/base_map_sidebar/BaseMapSidebar";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    mapboxgl.accessToken =
      "pk.eyJ1Ijoid2ViLW1hcGEtdXN1YXJpb3MiLCJhIjoiY2txMzllN3ZvMGhoaDJ3bXY1NzJiejhtbCJ9.zXVFKEMO40Ua1dDK-MmtHg";
    this.state = {
      markers: [],
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: "base-map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-77.02824, -12.04318],
      zoom: 5,
    });
    this.loadMarkers();
  }

  loadMarkers = () => {
    this.props.points.features.forEach((point) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([
          point.geometry.coordinates[0],
          point.geometry.coordinates[1],
        ])
        .addTo(this.map);

      marker.getElement().addEventListener("click", () => {
        this.baseMarkerClick(marker);
      });

      this.state.markers.push(marker);
    });
  };

  baseMarkerClick = (marker) => {
    this.map.flyTo({ center: marker.getLngLat(), zoom: 7 });
  };

  render() {
    return (
      <div className="full-screen">
        <Head>
          <title>Base Map</title>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <div
          id="base-map-container"
          style={{ width: "100%", height: "100%" }}
        ></div>
      </div>
    );
  }
}

export async function getStaticProps(context) {
  const points = json;
  return {
    props: {
      points,
    },
  };
}

export default BaseMap;
