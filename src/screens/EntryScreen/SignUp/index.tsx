import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import Field from "@/components/Field";
import Image from "@/components/Image";
import styles from "./SignUp.module.sass";

type SignUpProps = {
    onClick: () => void;
};

const SignUp = ({ onClick }: SignUpProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form action="" onSubmit={(e) => e.preventDefault()}>
            <Field
                className={styles.field}
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Field
                className={styles.field}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Field
                className={styles.field}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className={styles.btns}>
                <Link className={cn("button", styles.button)} href="/">
                    Create your account
                </Link>
                <Link className={cn("button", styles.button)} href="/">
                    <Image
                        src="/images/google.svg"
                        width={24}
                        height={24}
                        alt=""
                    />
                    Sign up with Google
                </Link>
            </div>
            <div className={styles.foot}>
                Already have an account?{" "}
                <button className={styles.link} onClick={onClick}>
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default SignUp;
