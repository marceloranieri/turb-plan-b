import Link from "next/link";
import cn from "classnames";
import Image from "@/components/Image";
import styles from "./Avatar.module.sass";

type AvatarProps = {
    className?: string;
    photo: string;
    href?: string;
    online?: boolean;
    onClick?: () => void;
};

const Avatar = ({ className, photo, href, online, onClick }: AvatarProps) => {
    const avatarContent = (
        <>
            <Image src={photo} width={44} height={44} alt="" />
            <svg width="0" height="0" style={{ display: "block" }}>
                <clipPath id="maskAvatar" clipPathUnits="objectBoundingBox">
                    <path d="M.136.341C.249.341.341.249.341.136.341.114.337.093.331.074S.323.049.324.044C.335.028.341.026.354.022A.5.5 0 0 1 1 .5a.5.5 0 1 1-1 0A.5.5 0 0 1 .022.354C.026.341.028.335.031.331.049.323.057.326.074.331s.041.01.063.01z" />
                </clipPath>
            </svg>
        </>
    );

    const avatarClass = cn(styles.avatar, className, {
        [styles.online]: online,
        [styles.offline]: !online,
    });

    return (
        <>
            {href ? (
                <Link className={avatarClass} href={href}>
                    {avatarContent}
                </Link>
            ) : (
                <div className={avatarClass} onClick={onClick}>
                    {avatarContent}
                </div>
            )}
        </>
    );
};

export default Avatar;
