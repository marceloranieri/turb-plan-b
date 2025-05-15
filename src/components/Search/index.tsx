import { ChangeEvent, FormEvent } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Search.module.sass";

type SearchProps = {
    className?: string;
    classInput?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    placeholder?: string;
    onClick?: () => void;
};

const Search = ({
    className,
    classInput,
    value,
    onChange,
    onSubmit,
    placeholder,
    onClick,
}: SearchProps) => {
    const handleClear = () => {
        onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    };
    return (
        <form
            className={cn(styles.search, className, {
                [styles.active]: value !== "",
            })}
            action=""
            onSubmit={onSubmit}
            onClick={onClick}
        >
            <button className={styles.result} type="submit">
                <Icon name="search" />
            </button>
            <input
                className={cn(classInput, styles.input)}
                type="text"
                name="search"
                placeholder={placeholder || "Search..."}
                value={value}
                onChange={onChange}
                required
            />
            <button
                className={styles.clear}
                type="button"
                onClick={handleClear}
            >
                <Icon name="close" />
            </button>
        </form>
    );
};

export default Search;
