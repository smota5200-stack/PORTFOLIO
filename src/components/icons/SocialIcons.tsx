"use client";

import {
    FaLinkedinIn,
    FaBehance,
    FaInstagram,
    FaDribbble,
    FaGithub,
    FaYoutube,
    FaTwitter,
    FaTiktok,
    FaFacebookF,
} from "react-icons/fa";
import { SiArtstation } from "react-icons/si";
import { HiOutlineLink } from "react-icons/hi";

export const socialIcons: Record<string, React.ReactNode> = {
    // Professional
    "LinkedIn": <FaLinkedinIn />,
    "Behance": <FaBehance />,
    "Dribbble": <FaDribbble />,
    "ArtStation": <SiArtstation />,
    "GitHub": <FaGithub />,

    // Social Media
    "Instagram": <FaInstagram />,
    "Twitter": <FaTwitter />,
    "X": <FaTwitter />,
    "YouTube": <FaYoutube />,
    "TikTok": <FaTiktok />,
    "Facebook": <FaFacebookF />,
};

export function getSocialIcon(name: string) {
    return socialIcons[name] || <HiOutlineLink />;
}
