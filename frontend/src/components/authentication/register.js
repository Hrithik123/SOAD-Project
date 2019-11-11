import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegInputFieldProps {
    constructor(type, class_name, name, placeholder = "") {
        this.type = type;
        this.class_name = class_name;
        this.name = name;
        this.placeholder = placeholder;
    }
}

class RegisterComp extends Component {
    constructor(props) {
        super(props);

        // this.props.logout();

        this.state = {
            email: "",
            username: "",
            dateOfBirth: "",
            password: "",
            re_password: "",
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    regInputFields = (inputFieldProps, values) => {
        let inputFields = [];

        for (let index = 0; index < inputFieldProps.length; index++) {
            let iF = inputFieldProps[index];

            inputFields.push(
                <input
                    type={iF.type}
                    className={iF.class_name}
                    name={iF.name}
                    value={values[index]}
                    placeholder={iF.placeholder}
                    onChange={this.handleChange}
                    autoComplete="off"
                />
            );
        }

        return inputFields;
    };

    render() {
        const {
            email,
            username,
            dateOfBirth,
            password,
            re_password
        } = this.state;
        const inputValues = [
            email,
            username,
            dateOfBirth,
            password,
            re_password
        ];

        const inputFields = [
            new RegInputFieldProps("email", "reg_email", "email", "Email..."),
            new RegInputFieldProps(
                "text",
                "username",
                "username",
                "Username..."
            ),
            // new RegInputFieldProps('text', 'name first', 'firstName', 'First Name...'),
            // new RegInputFieldProps('text', 'name last', 'lastName', 'Last Name...'),
            new RegInputFieldProps("text", "date", "dateOfBirth", "dd/mm/yyyy"),
            new RegInputFieldProps(
                "password",
                "reg_password",
                "password",
                "Password"
            ),
            new RegInputFieldProps(
                "password",
                "reg_password",
                "re_password",
                "Re-enter Password"
            )
        ];
        const inputs = this.regInputFields(inputFields, inputValues);

        return (
            <div className="register_main">
                <div className="image comp"></div>
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                    className="form comp"
                >
                    <h2>REGISTER</h2>
                    <div className="reg_inputs container">
                        <div className="row">
                            <div className="col-12">{inputs[0]}</div>
                        </div>
                        <div className="row">
                            <div className="col-7">{inputs[1]}</div>
                            <div className="col-5">{inputs[2]}</div>
                        </div>
                        <div className="row">
                            <div className="col-12">{inputs[3]}</div>
                        </div>
                        <div className="row">
                            <div className="col-12">{inputs[4]}</div>
                        </div>
                    </div>
                    <div className="reg_btns">
                        <button type="submit">REGISTER</button>
                    </div>
                    <div className="form_group login_btn">
                        Have an account already?&nbsp;
                        <Link to="/login" className="login_link">
                            {" "}
                            LogIn
                        </Link>
                        &nbsp;now
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterComp;
