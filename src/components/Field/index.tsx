import cn from "classnames";
import styles from "./Field.module.sass";

type FieldProps = {
    className?: string;
    classInput?: string;
    label?: string;
    textarea?: boolean;
    type?: string;
};

const Field = ({
    className,
    classInput,
    label,
    textarea,
    type,
    ...inputProps
}: FieldProps &
    React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <div className={cn(styles.field, className)}>
            {label && <div className={styles.label}>{label}</div>}
            <div
                className={cn(styles.wrap, {
                    [styles.wrapTextarea]: textarea,
                })}
            >
                {textarea ? (
                    <textarea
                        className={cn(styles.textarea, classInput)}
                        {...inputProps}
                    ></textarea>
                ) : (
                    <input
                        className={cn(styles.input, classInput)}
                        type={type || "text"}
                        {...inputProps}
                    />
                )}
            </div>
        </div>
    );
};

export default Field;
