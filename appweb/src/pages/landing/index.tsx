import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import aulasIcon from '../../assets/images/icons/give-classes.svg';
import coracaopurple from '../../assets/images/icons/purple-heart.svg';
import './styles.css';

function Landing (){
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logo} alt="logo proffy"/>
                    <h2>sua plataforma de estudos online</h2>
                </div>

                <img 
                    src={LandingImg} 
                    alt="imagem landing" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/estudar" className="study">
                        <img src={studyIcon} alt="estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={aulasIcon} alt="dar aulas"/>
                        Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de 200 conexões ja realizadas 
                    <img src={coracaopurple} 
                    alt="coração roxo" /
                    >
                </span>
            </div>
        </div>
    )
};

export default Landing;