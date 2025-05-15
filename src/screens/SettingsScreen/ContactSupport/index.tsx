import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Image from "@/components/Image";
import styles from "./ContactSupport.module.sass";

type ContactSupportProps = {};

const ContactSupport = ({}: ContactSupportProps) => {
    const [confirm, setConfirm] = useState(false);
    const [description, setDescription] = useState("");
    const options = [
        { id: "0", title: "Manage your account" },
        { id: "1", title: "Tell more about your problem" },
        { id: "2", title: "Technical issues and bug reports" },
    ];

    const [category, setCategory] = useState(options[0]);

    return confirm ? (
        <div className={styles.thanks}>
            <div className={styles.title}>Message sent</div>
            <div className={styles.text}>
                Thank you for reaching out. Our support team has received your
                message and will respond within 24 hours.
            </div>
            <div className={styles.preview}>
                <div className={styles.image}>
                    <Image
                        src="/images/thanks-pic.png"
                        width={482}
                        height={378}
                        alt=""
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className={styles.contactSupport}>
            <div className={styles.title}>Contact support</div>
            <div className={styles.description}>
                Describe your issue or concern in detail, including any relevant
                information about the content or users you believe are
                violating&nbsp;
                <Link href="/">
                    Bento&apos;s Restrictions of Content
                </Link> and <Link href="/">Use of Service</Link>.
            </div>
            <form
                className={styles.form}
                action=""
                onSubmit={(e) => e.preventDefault()}
            >
                <Select
                    className={styles.select}
                    label="Select a topic"
                    value={category}
                    onChange={setCategory}
                    options={options}
                />
                <Field
                    className={styles.field}
                    label="Description"
                    placeholder="Tell more about your problem"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    textarea
                />
                <button
                    className={cn("button", styles.button)}
                    onClick={() => setConfirm(true)}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ContactSupport;
