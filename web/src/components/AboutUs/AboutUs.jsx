import React from "react";
import Binyuan from "../../images/Binyuan.png";
import Ella from "../../images/Ella.png";
import Johannes from "../../images/Johannes.png";
import Martin from "../../images/Martin.png";
import Yoav from "../../images/Yoav.png";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <div className="middle-section">

            <div className="profiles">
                <div className="profile">
                    <figure>
                        <img src={Yoav} />
                        <span className="name"> Yoav Luft </span>
                        <span>luft@kth.se</span>
                        <p className="titles">
                            Full stack developer / Data-masseur
                        </p>
                        <p>
                            Our resident master-of-all-trades. Yoav’s excellent
                            data massaging capabilities managed to transform
                            this nightmarish data set to something that actually
                            makes sense. Responsible for the technical backbone
                            of Open Riksdag and a walking
                            programming-dictionary.
                        </p>
                    </figure>
                </div>
                <div className="profile">
                    <figure>
                        <img src={Martin} />
                        <span className="name">Martin Linder Nilsson</span>
                        <span>hmni@kth.se</span>
                        <p className="titles">
                            Front end developer / Research hunter/gatherer
                        </p>
                        <p>
                            Responsible for research and a core part of the data
                            processing team. With his almost all-seeing eye…
                            yeah, some-seeing eye if you will, he made sure no
                            detail was left to chance. As a cherry on top this
                            goal oriented guy also contributed with evaluation
                            skills.
                        </p>
                    </figure>
                </div>
                <div className="profile">
                    <figure>
                        <img src={Johannes} />
                        <span className="name">Johannes Loor</span>
                        <span>loor@kth.se</span>
                        <p className="titles">
                            Front end developer / UX-designer
                        </p>
                        <p>
                            Johannes is a front end developer with a keen eye
                            for details and totally on top of the interaction
                            aspects of the application. Although a bit grumpy on
                            an empty stomach, when fueled-up there ain’t no
                            tech-mountain high enough.
                        </p>
                    </figure>
                </div>
                <div className="profile">
                    <figure>
                        <img src={Binyuan} />
                        <span className="name">Binyuan Lin</span>
                        <span>binyuan@kth.se</span>
                        <p className="titles">
                            Front end developer / UX-designer
                        </p>
                        <p>
                            UX-designer and artist extraordinaire. Binyuan’s
                            contribution to the team was of paramount importance
                            as without her, the Open Riksdag page would look and
                            handle like the nineties. She put in a lot of hours
                            building prototypes to make sure that the team
                            always had a clear goal to aim for.
                        </p>
                    </figure>
                </div>
                <div className="profile">
                    <figure>
                        <img src={Ella} />
                        <span className="name">Ella Wirstad Gustafsson</span>
                        <span>ellag@kth.se</span>
                        <p className="titles">
                            Front end developer / Git-commander
                        </p>
                        <p>
                            Apart from being a solid front end developer, Ella’s
                            hawkish control over our repository made sure none
                            of our commits got tangled. From the very first
                            paper prototype, Ella’s vision and never-ending
                            supply of ideas were vital in the production of Open
                            Riksdag.
                        </p>
                    </figure>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;
