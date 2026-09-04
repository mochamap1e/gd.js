import { Group } from "@mantine/core";
import { IconHomeFilled } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

import classes from "@panel/components/Navbar.module.css";

interface NavData {
    link: string,
    text: string,
    icon: Icon
}

const data: NavData[] = [
    { link: "/", text: "Home", icon: IconHomeFilled },
    { link: "/test", text: "Test", icon: IconHomeFilled }
];

export function Navbar() {
    return (
        <nav className={classes.navbar}>
            <div className={classes.content}>
                {data.map((link, index) => (
                    <a
                        className={classes.link}
                        href={link.link}
                        key={index}
                    >
                        <link.icon/>
                        <span>{link.text}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
}