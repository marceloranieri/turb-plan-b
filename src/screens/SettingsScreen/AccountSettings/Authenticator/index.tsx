import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import ScanCode from "./ScanCode";
import CodeViaPhone from "./CodeViaPhone";
import styles from "./Authenticator.module.sass";

type AuthenticatorProps = {};

const Authenticator = ({}: AuthenticatorProps) => {
    const [isScan, setIsScan] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    const items = [
        {
            title: "Code from authenticator",
            description: "Generate a one-time code in your authenticator app",
            icon: "/images/settings.svg",
            onClick: () => setIsScan(true),
        },
        {
            title: "Code via phone",
            description: "Add and verify your phone number",
            icon: "/images/mobile.svg",
            onClick: () => setIsPhone(true),
        },
    ];

    return isScan ? (
        <ScanCode />
    ) : isPhone ? (
        <CodeViaPhone />
    ) : (
        <div className={styles.authenticator}>
            <div className={styles.title}>Turn on 2FA</div>
            <div className={styles.list}>
                {items.map((item, index) => (
                    <div
                        className={styles.item}
                        key={index}
                        onClick={item.onClick}
                    >
                        <div className={styles.icon}>
                            <Image
                                src={item.icon}
                                width={24}
                                height={24}
                                alt=""
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.subtitle}>{item.title}</div>
                            <div className={styles.description}>
                                {item.description}
                            </div>
                        </div>
                        <Icon name="arrow-down" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Authenticator;
