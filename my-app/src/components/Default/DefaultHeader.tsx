import { Link } from "react-router-dom";

const DefaultHeader = ({ }) => {

    return (
        <>
            <header className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/">
                                <img
                                    className="h-8 w-8"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                            </Link>

                            <Link to="/" className="text-white hover:bg-gray-600 px-3 py-2 rounded">
                                Головна
                            </Link>
                        </div>
                        <nav className="hidden md:flex space-x-4">
                            <Link to="/cart" className="text-white hover:bg-gray-600 px-3 py-2 rounded">
                                Кошик
                            </Link>
                        </nav>
                        
                    </div>
                </div>
            </header>

        </>
    );
}
export default DefaultHeader;