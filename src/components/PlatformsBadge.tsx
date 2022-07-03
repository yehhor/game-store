import {
    RiAndroidFill, RiAppleFill,
    RiGlobalLine,
    RiPlaystationFill,
    RiWindowsFill,
    RiXboxFill,

} from "react-icons/ri";
import {
    SiIos, SiLinux,
    SiNintendoswitch
} from 'react-icons/si'


interface Props {
    platforms: string[]
}

const platformIcons: Record<string, React.ReactNode> = {
    web: <RiGlobalLine/>,
    pc: <RiWindowsFill/>,
    android: <RiAndroidFill/>,
    ios: <SiIos/>,
    playstation: <RiPlaystationFill/>,
    xbox: <RiXboxFill/>,
    mac: <RiAppleFill/>,
    linux: <SiLinux/>,
    nintendo: <SiNintendoswitch/>,
};

function PlatformsBadge({platforms = []}: Props) {
    const platformsToRender = platforms.map(p => (
        <span key={p} style={{marginRight: 2}}>
            {platformIcons[p]}
        </span>
    ))

    return (
        <>
            {platformsToRender}
        </>
    )
}

export default PlatformsBadge