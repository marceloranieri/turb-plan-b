import { useId } from "react";
import { Tooltip } from "react-tooltip";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Share.module.sass";

type ShareProps = {
    className?: string;
};

const Share = ({ className }: ShareProps) => {
    const idTooltip = useId();

    return (
        <>
            <button
                className={cn("social-circle", className, styles.share)}
                data-tooltip-id={idTooltip}
                data-tooltip-content="Share"
                data-tooltip-place="top"
            >
                <Icon name="reply" />
            </button>
            <Tooltip id={idTooltip} />
        </>
    );
};

export default Share;
