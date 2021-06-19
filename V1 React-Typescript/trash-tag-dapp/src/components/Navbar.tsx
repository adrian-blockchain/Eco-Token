import React, {useState} from "react";

import './Navbar/Navbar.css';


export const Navbar =({account}:{account:string})=>{
    const [clicked, setClicked] = useState<boolean>(false)




    const handleClick = () =>{
        setClicked(!clicked);
        console.log(clicked)
    }

    return(
        <nav className="NavbarItems">

            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times': 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active': 'nav-menu'}>


                <li>
                    <a className="nav-links" href="#">
                        {account}
                    </a>
                </li>




            </ul>



        </nav>
    )
}
export default Navbar;

