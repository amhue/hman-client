import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function () {
    return (
        <footer
            className="bg-black/95 p-5 w-screen sticky top-[100vh] left-0 h-fit"
            id="contact"
        >
            <div className="flex justify-between text-white w-full mt-auto">
                <div>
                    <h2 className="font-bold pb-3">Contact Us</h2>
                    <p>Hotel Grand Oasis</p>
                    <p>42 Sunset Boulevard, Dream City, ZZ 99999</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Email: contact@luxora.fake</p>
                </div>

                <div>
                    <h2 className="font-bold pb-3">Quick Links</h2>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Rooms</a>
                        </li>
                        <li>
                            <a href="#">Dining</a>
                        </li>
                        <li>
                            <a href="#">Amenities</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold pb-3">Follow Us</h2>
                    <ul>
                        <li>
                            <a href="#">
                                <FaFacebook className="inline" /> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FaInstagram className="inline" />
                                Instagram
                            </a>
                        </li>
                        <li>
                            <FaTwitter className="inline" />
                            <a href="#">Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-white pt-5">
                <p>&copy; 2025 Hotel Grand Oasis. All rights reserved.</p>
            </div>
        </footer>
    );
}
