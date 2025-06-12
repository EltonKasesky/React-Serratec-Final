import React from 'react'
import logo from '../../assets/FarmaDEVTrans.png'
import { Link } from 'react-router-dom'
import * as styles from '../Header/Header.module.css'

export default function Header() {

    return (
        <header>
           <img src={logo} alt="Logo" />
            <div className='menu'>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/clientes"}>Clientes</Link>
                    </li>
                    <li>
                        <Link to={"/produtos"}>Produtos</Link>
                    </li>
                     <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                </ul>

            </div>
        </header>

    )
}

