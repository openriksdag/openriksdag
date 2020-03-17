import React from "react";
import "./AboutProject.css";
import Video from "../../images/OpenDemo.mp4";

const AboutProject = () => {

    return (
        <div className="about-project-content">
            <span>
                <video width="800" controls>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support HTML5 video.
        </video>
            </span>
            <span>
                <h2>Goals</h2>
                <p className="project-text">
                    The aim of Open Riksdag is to visualize the decision-making process of
                    the swedish parliamentary system. This in an attempt to increase
                    transparency and further strengthen the confidence of the general
                    public in democratic processes. Open Riksdags vision is to make
                    politics accessible for everyone and through visualizing complex data,
                    provide value for the novice and the political deep-diver alike.
        </p>
                <p className="project-text">
                    The project was made as a part of the Information Visualization
                    course, DH2321, at the Royal Institute of Technology in Stockholm,
                    Sweden, and deployed in march 2020.
        </p>
                <p>
                    The Open Riksdag team is made up of five master’s students of
                    interaction design at the Royal Institute of Technology in
                    Stockholm, Sweden. The project was made as a part of the
                    Information Visualization course, DH2321, in the spring of 2020.
                </p>
            </span>
        </div>
    );

};
export default AboutProject;
