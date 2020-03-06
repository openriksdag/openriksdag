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
            <div className="profile" >
                <figure>
                    <img src={Yoav} />
                    <span>    Yoav Luft    </span>
                    <span>luft@kth.se</span>
                </figure>
            </div>
            <div className="profile" >
                <figure>
                    <img src={Martin} />
                    <span>Martin Linder Nilsson</span>
                    <span>hmni@kth.se</span>
                </figure>

            </div>
            <div className="profile" >
                <figure>
                    <img src={Johannes} />
                    <span>Johannes Loor</span>
                    <span>loor@kth.se</span>
                </figure>
            </div>
            <div className="profile" >
                <figure>
                    <img src={Binyuan} />
                    <span>Binyuan Lin</span>
                    <span>binyuan@kth.se</span>
                </figure>

            </div>
            <div className="profile" >
                <figure>
                    <img src={Ella} />
                    <span>Ella Wirstad Gustafsson</span>
                    <span>ellag@kth.se</span>
                </figure>

            </div>
        </div>
    )

}
export default AboutUs;