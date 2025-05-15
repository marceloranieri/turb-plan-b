import { useState } from "react";
import cn from "classnames";
import Field from "@/components/Field";
import Image from "@/components/Image";
import styles from "./ResetPassword.module.sass";

type ResetPasswordProps = {
    onClick: () => void;
};

const ResetPassword = ({ onClick }: ResetPasswordProps) => {
    const [confirm, setConfirm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <form action="" onSubmit={(e) => e.preventDefault()}>
            {confirm ? (
                <>
                    <Field
                        className={styles.field}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Field
                        className={styles.field}
                        placeholder="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </>
            ) : (
                <Field
                    className={styles.field}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            )}
            <div className={styles.btns}>
                {confirm ? (
                    <button className={cn("button", styles.button)}>
                        Create new password
                    </button>
                ) : (
                    <button
                        className={cn("button", styles.button)}
                        onClick={() => setConfirm(true)}
                    >
                        Reset password
                    </button>
                )}
            </div>
            <div className={styles.foot}>
                Got your password{" "}
                <button className={styles.link} onClick={onClick}>
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default ResetPassword;
