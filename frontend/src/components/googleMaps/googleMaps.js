import React, { Component } from "react";

import GoogleMapReact from "google-map-react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng
} from "react-places-autocomplete";

import "./googleMaps.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// Google Maps Component
export class GoogleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyDVT0ZmvLdfK896MUBOOEDlC4imgzjss_0"
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        );
    }
}

// Location Search Input
export class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { address: "" };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log("Success", latLng))
            .catch(error => console.error("Error", error));
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                shouldFetchSuggestions={this.state.address.length > 3}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: "Search Places*",
                                className: "location-search-input",
                                id: "locationInput"
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className
                                        })}
                                        onClick={() => {
                                            this.props.getLocationInput(
                                                suggestion.description
                                            );
                                            this.setState({ address: "" });
                                        }}
                                    >
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
