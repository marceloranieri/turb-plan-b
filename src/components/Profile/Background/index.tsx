import { useRouter } from "next/navigation";
import cn from "classnames";
import Image from "@/components/Image";
import Actions from "@/components/Actions";
import Icon from "@/components/Icon";
import styles from "./Background.module.sass";

type BackgroundProps = {
    own?: boolean;
    background: string;
    avatar: string;
};

const Background = ({ own, background, avatar }: BackgroundProps) => {
    const router = useRouter();

    const actions = [
        {
            title: "Block",
            icon: "lock",
            onClick: () => console.log("Block"),
        },
        {
            title: "Copy link",
            icon: "copy",
            onClick: () => console.log("Copy link"),
        },
        {
            title: "Copy profile link",
            icon: "link",
            onClick: () => console.log("Copy profile link"),
        },
        {
            title: "Snooze",
            icon: "eye-slash",
            onClick: () => console.log("Snooze"),
        },
    ];

    return (
        <div className={styles.background}>
            <Image
                src={background}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt=""
            />
            <div className={styles.avatar}>
                <Image src={avatar} width={80} height={80} alt="" />
            </div>
            {!own && (
                <button
                    className={cn("button-circle", styles.back)}
                    onClick={() => router.back()}
                >
                    <Icon name="arrow-left" />
                </button>
            )}
            <Actions
                className={styles.actions}
                classHead={styles.actionsHead}
                classBody={styles.actionsBody}
                items={actions}
                headButton
                reverse
            />
        </div>
    );
};

export default Background;
