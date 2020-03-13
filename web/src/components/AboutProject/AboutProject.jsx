import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
    return (
        <div className="about-project-content">
            <span>
                <h2>Goals</h2>
                <p className="project-text">
                    The aim of Open Riksdag is to visualize the decision-making
                    process of the swedish parliamentary system. This in an
                    attempt to increase transparency and further strengthen the
                    confidence of the general public in democratic processes.
                    Open Riksdags vision is to make politics accessible for
                    everyone and through visualizing complex data, providing
                    value for the novice and the political deep-diver alike.
                </p>
                <p className="project-text">
                    The project was made as a part of the Information
                    Visualization course, DH2321, at the Royal Institute of
                    Technology in Stockholm, Sweden.
                </p>
            </span>
        </div>
    );
};
export default AboutProject;
