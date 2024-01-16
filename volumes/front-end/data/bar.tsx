import dataBar from "next/link";

type dataBar= {
    link : string,
    name : string,
    icon : string,
}

const Bar : dataBar[] = [
    {
        link : "/",
        name : "Profile",
        icon : "dashboard.svg",
    },
    {
        link : "/rooms",
        name : "Teams",
        icon : "Group.svg",
    },
    {
        link : "/channels",
        name : "Channels",
        icon : "event.svg",
    },
    {
        link : "/settings",
        name : "Settings",
        icon : "setting.svg",
    }

]

export default Bar;
