import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook,BsInstagram,BsGithub,BsDiscord,BsTwitterX} from 'react-icons/bs';
export default function FooterSec(){
    return (
        <Footer container className="border border-t-2 border-teal-800">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                <div className="flex items-center">
                    <img src="../assets/logo.png" alt="Logo" />
                    <span>iBlog</span>
                </div>
                </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                    <Footer.Link href="https://victory-17.github.io/Movies-Website/" target="_blank" rel="noopener noreferrer">
                        Movies website
                    </Footer.Link>
                    <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
                        iBlog
                    </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title="Follow Us" />
                <Footer.LinkGroup col>
                    <Footer.Link href="https://github.com/victory-17" target="_blank" rel="noopener noreferrer">
                        Github
                    </Footer.Link>
                    <Footer.Link href="https://www.linkedin.com/in/ahmed-yehia-2684652a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                    target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                    <Footer.Link href="#">
                        Privacy Policy
                    </Footer.Link>
                    <Footer.Link href="#">
                        Terms &amp; Conditions
                    </Footer.Link>
                </Footer.LinkGroup>
                </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by="Ahmed Yehia & AbdEl-Rahman Nasr" year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />
                    <Footer.Icon href="#" icon={BsTwitterX} />
                    <Footer.Icon href="#" icon={BsGithub} />
                    <Footer.Icon href="#" icon={BsDiscord} />
                </div>
                </div>
            </div>
        </Footer>
    );
}