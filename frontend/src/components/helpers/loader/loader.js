import React, { Component } from "react";
import Loader from "react-loader";

import "./loader.css";

export default class LoadingComp extends Component {
    render() {
        return (
            <div className="ccLoadingPage">
                <Loader
                    loaded={false}
                    lines={13}
                    length={20}
                    width={10}
                    radius={30}
                    corners={1}
                    rotate={0}
                    direction={1}
                    color="#7f2bb8"
                    speed={1}
                    trail={60}
                    shadow={false}
                    hwaccel={false}
                    className="spinner"
                    zIndex={2e9}
                    top="50%"
                    left="50%"
                    scale={1.0}
                    loadedClassName="loadedContent"
                />
            </div>
        );
    }
}
