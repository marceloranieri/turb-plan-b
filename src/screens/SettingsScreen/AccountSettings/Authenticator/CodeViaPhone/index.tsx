import { useState } from "react";
import cn from "classnames";
import Field from "@/components/Field";
import styles from "./CodeViaPhone.module.sass";

type CodeViaPhoneProps = {};

const CodeViaPhone = ({}: CodeViaPhoneProps) => {
    const [verification, setVerification] = useState<boolean>(false);
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");

    return verification ? (
        <>
            <div className={styles.title}>Enter code</div>
            <div className={styles.text}>
                <p>We sent you a verification code via</p>
                <p>
                    <span>+1 123-456-7890</span>. <button>Resend code</button>
                </p>
            </div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <Field
                    className={styles.field}
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button className={cn("button", styles.button)}>
                    Send code
                </button>
            </form>
        </>
    ) : (
        <>
            <div className={styles.title}>Enter phone number</div>
            <div className={styles.text}>
                Enter your phone number to receive a 2-step verification code.
            </div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <Field
                    className={styles.field}
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button
                    className={cn("button", styles.button)}
                    onClick={() => setVerification(true)}
                >
                    Send phone
                </button>
            </form>
        </>
    );
};

export default CodeViaPhone;
