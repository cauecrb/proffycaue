import React from 'react';
import whtasImg from '../../assets/images/icons/whatsapp.svg'
import './styles.css';
import api from '../../services/api'

export interface Prof {
    id:number;
    name: string;
    avatar: string;
    bio: string;
    cost: string;
    subject: string;
    whatsapp: string;
}

interface ProfItemProps{
    prof: Prof
}

const ProfItem: React.FC<ProfItemProps> = ({ prof }) => {
    function createNewConnection(){
        api.post('/connections', {user_id: prof.id})
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={prof.avatar} alt={prof.name}/>
                <div>
                    <strong>{prof.name}</strong>
                    <span>{prof.subject}</span>
                </div>
            </header>

            <p>
                {prof.bio}
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>{prof.cost}</strong>
                </p>
                <a 
                    target= "_blank"
                    onClick={createNewConnection}
                    href={'https://wa.me/${prof.whatsapp}'}>
                    <img src={whtasImg} alt="Whatsapp" />
                    Contato

                </a>
            </footer>
        </article>
    )
}

export default ProfItem;
/* function ProfItem(){
    return(
        <article className="teacher-item">
                    <header>
                        <img src="https://avatars1.githubusercontent.com/u/64268017?s=460&u=4309c24b5c00818d5cc19d318e1afc971b331119&v=4" alt="Cauê Rafael Burgardt"/>
                        <div>
                            <strong> Cauê Rafael Burgardt</strong>
                            <span>Computação</span>
                        </div>
                    </header>
                    <p>
                        Aqui coloca descriçoes e blablabla.
                        <br>
                        </br>
                        mais um pouco de bla bla bla
                    </p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ 80,00</strong>
                        </p>
                        <button type="button">
                            <img src={whtasImg} alt="Whastapp"/>
                            Entrar em contato
                        </button>
                    </footer>
                </article>
    );
}

export default ProfItem; */