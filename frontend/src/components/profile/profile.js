import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PostComp from "../post/post";
import LeftContent from "./leftContent/leftContent";
import RightContent from "./rightContent/rightContent";
import NavBar from "../nav bar/navBar";
import CreatePostComp from "../post/createPost/createPost";

import "./profile.css";

import { getUserByName, getUserPosts } from "../../actions/index";

// Post Element Class...
class Post {
    constructor(name, time, job, location, liked) {
        this.name = name;
        this.time = time;
        this.job = job;
        this.location = location;
        this.liked = liked;
    }
}

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.username = this.props.match.params.username;
        this.authedUser = false;
        this.state = {
            user: this.props.auth.user,
            nav: "nav1",
            showUploadPostPopUP: false,
            requestUserByName: false,
            requestUserPosts: false,
            userExists: true
        };

        this.handleNavigation = this.handleNavigation.bind(this);
        this.toggleUploadPostPopUp = this.toggleUploadPostPopUp.bind(this);
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
        if (!this.state.requestUserByName) {
            this.props.getUserByName(this.props.match.params.username);
            this.setState({ requestUserByName: true });
        }
    }
    componentDidUpdate() {
        document.body.scrollTo(0, 0);
    }

    // Sub Navigator...
    handleNavigation = nav => {
        this.setState({ nav: nav });
    };

    // Toggle Create Post PopUp
    toggleUploadPostPopUp = () => {
        this.setState({
            showUploadPostPopUP: !this.state.showUploadPostPopUP
        });
    };

    // Generates Cards of Posts...
    postCards = postDetails => {
        let postCards = [];
        for (let i = 0; i < postDetails.length; i++) {
            const post = postDetails[i];
            const post_details = {
                name: post.title,
                time: post.date.split("T")[0],
                owner: post.owner[0],
                likes: post.likes
            };
            postCards.push(<PostComp post_details={post} index={i} key={i} />);
        }

        return postCards;
    };

    render() {
        if (this.username !== this.props.match.params.username) {
            this.username = this.props.match.params.username;
            this.props.getUserByName(this.username);
        }
        if (!this.state.requestUserPosts && this.props.otherUsers.userProfile) {
            this.props.getUserPosts(this.props.otherUsers.userProfile._id);
            this.setState({ requestUserPosts: true });
        }
        const coverimage = require("../media/images/profile/cover.jpg");

        const username = this.props.match.params.username;

        const { auth, otherUsers, posts } = this.props;

        this.authedUser = auth.user
            ? auth.user.name === this.props.match.params.username
                ? true
                : false
            : false;

        return (
            <React.Fragment>
                <NavBar contract={true} />
                <div className="profile row">
                    <div className="col">
                        <div
                            className="coverImage row justify-content-end"
                            style={{ backgroundImage: `url(${coverimage})` }}
                        >
                            {auth.isAuthed ? (
                                this.authedUser ? (
                                    <React.Fragment>
                                        <div className="overLay"></div>
                                        <div className="col-1 account-settings">
                                            <Link
                                                to="/user-account-settings/general"
                                                style={{
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <button className="accountSettingsButton">
                                                    <i
                                                        className="fa fa-cog fa-spin"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </Link>
                                        </div>
                                    </React.Fragment>
                                ) : null
                            ) : null}
                        </div>
                        <div className="profile-content row">
                            <div className="col-3">
                                {otherUsers.userProfile &&
                                !otherUsers.isLoading ? (
                                    <LeftContent
                                        userProfile={otherUsers.userProfile}
                                    />
                                ) : null}
                            </div>
                            <div className="col-6">
                                <div className="userContent row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="userName col">
                                                <h3>
                                                    {otherUsers.userProfile
                                                        ? otherUsers.userProfile
                                                              .name
                                                        : ""}
                                                </h3>
                                            </div>
                                            <div className="userMail col align-self-center">
                                                <h6>
                                                    <i
                                                        className="fa fa-envelope"
                                                        aria-hidden="true"
                                                    ></i>
                                                    &nbsp;&nbsp;&nbsp;
                                                    {otherUsers.userProfile
                                                        ? otherUsers.userProfile
                                                              .email
                                                        : ""}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="userJob col">
                                                <h4>
                                                    {otherUsers.userProfile
                                                        ? otherUsers.userProfile
                                                              .primaryInterset
                                                            ? otherUsers
                                                                  .userProfile
                                                                  .primaryInterset
                                                            : "No Primary Interest Opted"
                                                        : ""}
                                                </h4>
                                            </div>
                                            <div className="userLocation col">
                                                <h4>
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                    &nbsp;&nbsp;
                                                    {otherUsers.userProfile
                                                        ? otherUsers.userProfile.dateofbirth.split(
                                                              "T"
                                                          )[0]
                                                        : "dd/mm/yyyy"}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="nav row">
                                            <div className="col-2">
                                                <button
                                                    name="nav1"
                                                    onClick={() => {
                                                        this.handleNavigation(
                                                            "nav1"
                                                        );
                                                    }}
                                                    className={
                                                        this.state.nav ===
                                                        "nav1"
                                                            ? "active"
                                                            : ""
                                                    }
                                                >
                                                    <i
                                                        className={
                                                            "fa fa-newspaper-o" +
                                                            (this.state.nav ===
                                                            "nav1"
                                                                ? " active"
                                                                : "")
                                                        }
                                                        aria-hidden="true"
                                                    ></i>
                                                    <h6>Feed</h6>
                                                </button>
                                            </div>
                                            <div className="col-2">
                                                <button
                                                    name="nav2"
                                                    onClick={() => {
                                                        this.handleNavigation(
                                                            "nav2"
                                                        );
                                                    }}
                                                    className={
                                                        this.state.nav ===
                                                        "nav2"
                                                            ? "active"
                                                            : ""
                                                    }
                                                >
                                                    <i
                                                        className={
                                                            "fa fa-info" +
                                                            (this.state.nav ===
                                                            "nav2"
                                                                ? " active"
                                                                : "")
                                                        }
                                                        aria-hidden="true"
                                                    ></i>
                                                    <h6>Info</h6>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {posts.userPosts
                                    ? this.postCards(posts.userPosts)
                                    : null}
                            </div>
                            <div className="col-3">
                                {otherUsers.userProfile ? (
                                    <RightContent
                                        togglePopUp={this.toggleUploadPostPopUp.bind(
                                            this
                                        )}
                                        userProfile={otherUsers.userProfile}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <CreatePostComp
                    togglePopUp={this.toggleUploadPostPopUp.bind(this)}
                    showPopUp={this.state.showUploadPostPopUP}
                />
            </React.Fragment>
        );
    }
}

ProfilePage.propTypes = {
    getUserByName: PropTypes.func.isRequired,
    getUserPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    otherUsers: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    otherUsers: state.otherUsers,
    posts: state.posts
});

export default connect(mapStateToProps, { getUserByName, getUserPosts })(
    ProfilePage
);
