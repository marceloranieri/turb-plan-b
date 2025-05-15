import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Email.module.sass";

type EmailProps = {};

const Email = ({}: EmailProps) => {
    const [email, setEmail] = useState("moyoshiro@email.com");
    const [change, setChange] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleCancel = () => {
        setConfirm(false);
        setChange(false);
    };

    const handleResend = () => {
        setConfirm(false);
        setChange(false);
    };

    return (
        <div className={styles.email}>
            <div className={styles.head}>
                <div className={styles.label}>
                    <Icon name="envelope" />
                    Email
                </div>
                {!change && (
                    <div className={styles.value}>moyoshiro@email.com</div>
                )}
                {change ? (
                    <form
                        className={styles.form}
                        action=""
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="moyoshiro@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            className={cn(styles.sent, {
                                [styles.active]: email !== "",
                            })}
                            onClick={() => setConfirm(true)}
                        >
                            <Icon
                                name={
                                    email !== "" ? "check" : "arrow-right-fat"
                                }
                            />
                        </button>
                    </form>
                ) : (
                    <div
                        className={styles.change}
                        onClick={() => setChange(true)}
                    >
                        Change email
                    </div>
                )}
            </div>
            {confirm && (
                <div className={styles.foot}>
                    <div className={styles.note}>
                        Code sent to <span>user@email.com</span>
                    </div>
                    <div className={styles.actions}>
                        <button
                            className={styles.cancel}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.resend}
                            onClick={handleResend}
                        >
                            Resend code
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Email;
