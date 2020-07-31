import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'

const Map = (props) => {

    return (
        <GoogleMap
            defaultZoom={10} 
            defaultCenter={{lat: 39.7392, lng:-104.9903}}
        >
            {props.crawlStops.map( crawlStop => 
                <Marker 
                    key={crawlStop.id} 
                    position={{lat: crawlStop.brewery_latitude, lng: crawlStop.brewery_longitude}} 
                    icon={{
                        url: '/Beer.png',
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
            )}
            
        </GoogleMap> 
    )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))