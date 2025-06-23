import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    logo = {
        url: "/dashboard",
        src: "",
        alt: "logo",
        title: "Finway",
    },
    menu = [
        { title: "Home", url: "/dashboard" },
        {
            title: "Income",
            url: "/dashboard/income",
        },
        {
            title: "Expense",
            url: "/dashboard/expense",
        },

    ],
}: NavbarProps) => {
    return (
        <aside className="h-screen w-64 bg-background border-r flex flex-col py-6 px-4">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2 mb-8">
                {logo.src && <img src={logo.src} className="max-h-8" alt={logo.alt} />}
                <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
            </a>
            {/* Menu */}
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    {menu.map((item) => renderVerticalMenuItem(item))}
                </ul>
            </nav>
            {/* Auth Buttons */}
            {/* <div className="flex flex-col gap-2 mt-8">
                <Button asChild variant="outline" size="sm">
                    <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm">
                    <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
            </div> */}
        </aside>
    );
};

const renderVerticalMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <Accordion type="single" collapsible key={item.title} className="w-full">
                <AccordionItem value={item.title} className="border-b-0">
                    <AccordionTrigger className="text-md py-2 font-semibold hover:no-underline">
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <ul className="flex flex-col gap-1">
                            {item.items.map((subItem) => (
                                <li key={subItem.title}>
                                    <SubMenuLink item={subItem} />
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return (
        <li key={item.title}>
            <a
                href={item.url}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-md font-semibold hover:bg-muted transition-colors"
            >
                {item.icon && <span>{item.icon}</span>}
                {item.title}
            </a>
        </li>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="flex flex-row gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
            href={item.url}
        >
            {item.icon && <span>{item.icon}</span>}
            <span>
                {item.title}
                {item.description && (
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
            </span>
        </a>
    );
};

export default Navbar;
