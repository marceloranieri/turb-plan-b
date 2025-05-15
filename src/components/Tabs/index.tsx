import cn from "classnames";
import styles from "./Tabs.module.sass";

type TabType = {
    title: string;
    value: string;
    onClick?: () => void;
};

type TabsProps = {
    className?: string;
    items: TabType[];
    value: number | string;
    setValue: (value: string) => void;
};

const Tabs = ({ className, items, value, setValue }: TabsProps) => {
    const handleClick = (value: string, onClick?: () => void) => {
        setValue(value);
        onClick?.();
    };

    return (
        <div className={cn(styles.tabs, className)}>
            <div className={styles.inner}>
                <div
                    className={cn(
                        styles.block,
                        { [styles.triple]: items.length === 3 },
                        { [styles.quadruple]: items.length === 4 },
                        { [styles.active1]: items[0].value === value },
                        { [styles.active2]: items[1]?.value === value },
                        { [styles.active3]: items[2]?.value === value },
                        { [styles.active4]: items[3]?.value === value }
                    )}
                ></div>
                {items.map((item) => (
                    <button
                        className={cn(styles.button, {
                            [styles.active]: value === item.value,
                        })}
                        onClick={() => handleClick(item.value, item.onClick)}
                        key={item.value}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
