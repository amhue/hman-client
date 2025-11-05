import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-black/95 text-white w-full border-t border-white/10"
        >
            <div className="max-w-5xl mx-auto px-6 py-10 text-center flex flex-col items-center">
                {/* Contact */}
                <div className="mb-8">
                    <h2 className="font-semibold text-lg mb-3 text-white/90">
                        Contact Us
                    </h2>
                    <p className="text-white/80">Hotel Grand Oasis</p>
                    <p className="text-white/80">
                        42 Sunset Boulevard, Dream City, ZZ 99999
                    </p>
                    <p className="mt-2 text-white/70">📞 +1 (555) 123-4567</p>
                    <p className="text-white/70">✉️ contact@luxora.fake</p>
                </div>

                {/* Quick Links */}
                <div className="mb-8">
                    <h2 className="font-semibold text-lg mb-3 text-white/90">
                        Quick Links
                    </h2>
                    <ul className="flex flex-wrap justify-center gap-6 text-white/70">
                        {["Home", "Rooms", "Dining", "Amenities", "Contact"].map(
                            (link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="hover:text-white transition duration-300"
                                    >
                                        {link}
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Social */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg mb-3 text-white/90">
                        Follow Us
                    </h2>
                    <div className="flex justify-center space-x-6 text-2xl">
                        <a
                            href="#"
                            className="hover:text-blue-500 transition duration-300"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="#"
                            className="hover:text-pink-500 transition duration-300"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="hover:text-sky-400 transition duration-300"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 w-full pt-4 text-sm text-white/60">
                    © 2025 Hotel Grand Oasis. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
