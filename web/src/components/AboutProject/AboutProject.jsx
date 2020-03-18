import React from "react";
import "./AboutProject.css";
import Video from "../../images/OpenDemo.mp4";

const AboutProject = () => {

    return (
        <div className="about-project-content">
            <div className="video-section">

                <span>
                    <video width="800" controls>
                        <source src={Video} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                </span>
            </div>

            

            <span>
                <br></br>
                <h3>Goals</h3>
                <p className="project-text">
                    The aim of Open Riksdag is to visualize the decision-making process of
                    the Swedish parliamentary system. Our motivation of creating this project
                     is to help people gain a better understanding of how the Swedish political system works.
                     This is also an attempt to increase transparency and further strengthen the confidence of the general
                    public in democratic processes. Open Riksdags vision is to make
                    politics accessible for everyone and through visualizing complex data,
                    provide value for the novice and the political deep-diver alike.
                 </p>
                 
            </span>

            <span>
                <h3>Learning objectives reached</h3>
                    <p className="project-text">
                         We achieved our group goal of visualizing relations and flow of data for the Swedish parliamentary system.
                         We managed to handle complex, real-life data, and created approachable representations. During the project,
                         we also sharpened our programming skills and developed as frontend designers. 
        
                    </p>
                    
            </span>

             <span>
                <h3>The team </h3>
                <p className="project-text">
                    The Open Riksdag team is made up of five master students
                     at KTH Royal Institute of Technology in
                    Stockholm, Sweden. The project was made as a part of the
                    Information Visualization course, DH2321, in the spring of 2020.
                </p>
            </span>
        </div>
    );

};
export default AboutProject;
