import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai";
import {FaMoon} from "react-icons/fa";

export default function Header() {
    const path = useLocation().pathname; 
    return (
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <div className="flex items-center">
                    <img src="../assets/logo.png" alt="Logo" />
                    <span>iBlog</span>
                </div>
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder="Search.."
                    rightIcon={AiOutlineSearch}
                    className="hidden sm:inline"
                />
            </form>
            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>

            <div className="flex items-center gap-2 md: order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    <FaMoon />
                </Button>
                <Link to="/sign-in" className="flex items-center text-sm sm:text-xl font-semibold dark:text-white ml-4">
                <Button gradientDuoTone="purpleToBlue">
                    Sign In
                </Button>
                </Link>

                <Link to="/sign-up" className="flex items-center text-sm sm:text-xl font-semibold dark:text-white ml-4">
                    <Button color="gray">
                        Sign Up
                    </Button>
                </Link>

                <Navbar.Toggle />
            </div>

                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to="/">Home</Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to="/about">About</Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === "/projects"} as={'div'}>
                        <Link to="/projects">Projects</Link>
                    </Navbar.Link>

                </Navbar.Collapse>
        </Navbar>
    )
}
