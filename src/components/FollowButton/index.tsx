import { useState, useId } from "react";
import { Tooltip } from "react-tooltip";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./FollowButton.module.sass";

type FollowButtonProps = {
    className?: string;
    value: boolean;
    onlyText?: boolean;
};

const FollowButton = ({ className, value, onlyText }: FollowButtonProps) => {
    const [isFollowing, setIsFollowing] = useState(value);
    const [isUnfollowing, setIsUnfollowing] = useState(false);
    const idTooltip = useId();

    const handleFollow = () => {
        if (!isFollowing && !isUnfollowing) {
            setIsFollowing(true);
        } else if (isFollowing && !isUnfollowing) {
            setIsUnfollowing(true);
            setTimeout(() => {
                setIsUnfollowing(false);
            }, 3000);
        } else {
            setIsFollowing(false);
            setIsUnfollowing(false);
        }
    };

    return (
        <>
            <button
                className={cn(
                    onlyText
                        ? ["button", styles.buttonText]
                        : ["button-circle", styles.buttonCircle],
                    className,
                    styles.button,
                    {
                        [styles.following]: isFollowing,
                        [styles.unfollowing]: isUnfollowing,
                    }
                )}
                onClick={handleFollow}
                data-tooltip-id={idTooltip}
                data-tooltip-content={
                    !isFollowing
                        ? "Follow"
                        : isUnfollowing
                        ? "Unfollow?"
                        : "Following"
                }
                data-tooltip-place="top"
            >
                <Icon
                    className={cn(styles.icon, {
                        [styles.hideIcon]: onlyText,
                    })}
                    name={
                        !isFollowing ? "add" : isUnfollowing ? "close" : "check"
                    }
                />
                {!isFollowing
                    ? "Follow"
                    : isUnfollowing
                    ? "Unfollow?"
                    : "Following"}
            </button>
            <Tooltip
                className={cn(styles.tooltip, {
                    [styles.hideTooltip]: onlyText,
                })}
                id={idTooltip}
            />
        </>
    );
};

export default FollowButton;
