import { useState } from "react";
import Switch from "@/components/Switch";
import styles from "./CookieSettings.module.sass";

type CookieSettingsProps = {};

const CookieSettings = ({}: CookieSettingsProps) => {
    const [marketing, setMarketing] = useState(true);
    const [analytics, setAnalytics] = useState(false);
    const [functional, setFunctional] = useState(true);

    const items = [
        {
            title: "Marketing",
            description: "Utilized for precision marketing.",
            switchChecked: marketing,
            setSwitchChecked: () => setMarketing(!marketing),
        },
        {
            title: "Analytics",
            description: "Used to measure usage and enhance your experience.",
            switchChecked: analytics,
            setSwitchChecked: () => setAnalytics(!analytics),
        },
        {
            title: "Functional",
            description:
                "Stores user preferences and enables advanced functionalities.",
            switchChecked: functional,
            setSwitchChecked: () => setFunctional(!functional),
        },
    ];

    return (
        <div className={styles.cookieSettings}>
            {items.map((item, index) => (
                <div className={styles.item} key={index}>
                    <div className={styles.details}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.description}>
                            {item.description}
                        </div>
                    </div>
                    <Switch
                        checked={item.switchChecked}
                        onChange={item.setSwitchChecked}
                    />
                </div>
            ))}
        </div>
    );
};

export default CookieSettings;
