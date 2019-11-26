import React, { Component } from "react";

import Img from "react-image";

import NavBar from "../nav bar/navBar";
import "./organisations.css";

// Organisation Class
class Organisation {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

class Organisations extends Component {
    constructor(props) {
        super(props);

        this.orgImage = require("../media/images/categories/photographer.png");
        this.organisations = [
            new Organisation("Nocturnals", this.orgImage),
            new Organisation("Nocturnals", this.orgImage),
            new Organisation("Nocturnals", this.orgImage),
            new Organisation("Nocturnals", this.orgImage)
        ];
    }

    userOrganisationsComp = () => {
        let comps = [];
        for (let index = 0; index < this.organisations.length; index++) {
            const comp = this.organisations[index];
            comps.push(
                <div className="organisation">
                    <div>
                        <Img src={comp.image} className="image" />
                        <h6 className="name">{comp.name}</h6>
                    </div>
                </div>
            );
        }

        return comps;
    };

    render() {
        return (
            <React.Fragment>
                <NavBar contract={true} />
                <div className="container-fluid organisations">
                    <div className="userOrganisations">
                        {this.userOrganisationsComp()}
                    </div>
                    <div className="row">
                        <div className="col-4 feed"></div>
                        <div className="col-5 work"></div>
                        <div className="col-2 members"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Organisations;
