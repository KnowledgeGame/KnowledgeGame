import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

function Mapbox() {
    const handleZoomChange = (newZoom) => {
        setViewport((prevViewport) => ({
            ...prevViewport,
            zoom: newZoom,
        }));
    };
    const [viewport, setViewport] = useState({
        latitude: 21.0285,
        longitude: 105.8542,
        zoom: 16,
    });
    const [addressMarker, setAddressMarker] = useState([]);

    const addressdata = useMemo(() => [{ id: 1, address: 'Chùa Ngâu Yên Ngưu Tam Hiệp Thanh Trì Hà Nội' }], []);
    useEffect(() => {
        let newaddressdata = [];
        addressdata.map((address) => {
            axios
                .get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?access_token=pk.eyJ1Ijoic2hvcGtpZW50aHVjIiwiYSI6ImNsdDZxc2JteTBlMDUycXAzdmJqcXFicW0ifQ.VqLlWpYqpNUSR4HwVL-98g`,
                )
                .then(function (response) {
                    // handle success
                    newaddressdata.push({
                        ...address,
                        longitude: response.data.features[0].center[0],
                        latitude: response.data.features[0].center[1],
                    });
                    setAddressMarker(newaddressdata);

                    // Set viewport to the first Marker's location
                    setViewport((prevViewport) => ({
                        ...prevViewport,
                        latitude: response.data.features[0].center[1],
                        longitude: response.data.features[0].center[0],
                    }));
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            return address;
        });
    }, [addressdata]);

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="Your access token key!"
            mapboxAccessToken="pk.eyJ1Ijoic2hvcGtpZW50aHVjIiwiYSI6ImNsdDZxc2JteTBlMDUycXAzdmJqcXFicW0ifQ.VqLlWpYqpNUSR4HwVL-98g"
            onViewportChange={(newViewport) => setViewport(newViewport)}
            onViewStateChange={({ viewState }) => handleZoomChange(viewState.zoom)}
            attributionControl={false}
        >
            {addressMarker.map((adressm) => (
                <Marker key={adressm.id} latitude={adressm.latitude} longitude={adressm.longitude}>
                    <svg
                        height="40"
                        viewBox="0 0 24 24"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#FF0000" // Set fill color to red
                    >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                </Marker>
            ))}
            {/* NavigationControl for zoom controls */}
            <div style={{ position: 'absolute', right: 10, bottom: 10 }}>
                <NavigationControl />
            </div>
        </ReactMapGL>
    );
}

export default Mapbox;
