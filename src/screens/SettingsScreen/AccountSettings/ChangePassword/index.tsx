import { useState } from "react";
import cn from "classnames";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import styles from "./ChangePassword.module.sass";

type ChangePasswordProps = {};

const ChangePassword = ({}: ChangePasswordProps) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <>
            <button
                className={styles.change}
                onClick={() => setVisibleModal(true)}
            >
                Change
            </button>
            <Modal
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <div className={styles.title}>Change password</div>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <Field
                        className={styles.field}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Field
                        className={styles.field}
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Field
                        className={styles.field}
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        className={cn("button", styles.button)}
                        type="submit"
                    >
                        Change password
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default ChangePassword;
