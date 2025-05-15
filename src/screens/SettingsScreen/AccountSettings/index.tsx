import { useState } from "react";
import Modal from "@/components/Modal";
import Accordion from "../Accordion";
import Item from "../Item";
import Profile from "./Profile";
import Email from "./Email";
import ChangePassword from "./ChangePassword";
import Authenticator from "./Authenticator";
import CookieSettings from "./CookieSettings";
import styles from "./AccountSettings.module.sass";

type AccountSettingsProps = {};

const AccountSettings = ({}: AccountSettingsProps) => {
    const [authenticator, setAuthenticator] = useState(false);
    const [privateProfile, setPrivateProfile] = useState(false);

    return (
        <>
            <div className={styles.account}>
                <Profile />
                <Accordion title="account" defaultHeight="auto">
                    <Email />
                    <Item
                        className={styles.item}
                        title="Password"
                        icon="lock"
                        rightContent={<ChangePassword />}
                    />
                    <Item
                        className={styles.item}
                        title="2FA"
                        icon="qr-code"
                        switchToggle
                        switchChecked={authenticator}
                        setSwitchChecked={() =>
                            setAuthenticator(!authenticator)
                        }
                    />
                    <Item
                        className={styles.item}
                        title="Delete account"
                        icon="trash"
                        onClick={() => console.log("Delete account")}
                    />
                </Accordion>
                <Accordion title="Privacy" defaultHeight="auto">
                    <Item
                        className={styles.item}
                        title="Private profile"
                        icon="lock"
                        switchToggle
                        switchChecked={privateProfile}
                        setSwitchChecked={() =>
                            setPrivateProfile(!privateProfile)
                        }
                    />
                    <Item
                        className={styles.item}
                        title="Cookie settings"
                        icon="shield"
                        dropdownHead="Customize"
                        dropdownBody={<CookieSettings />}
                    />
                    <Item
                        className={styles.item}
                        title="Direct message"
                        icon="shield"
                        dropdownHead="Everyone"
                        dropdownBody={<CookieSettings />}
                    />
                </Accordion>
            </div>
            <Modal
                visible={authenticator}
                onClose={() => setAuthenticator(!authenticator)}
            >
                <Authenticator />
            </Modal>
        </>
    );
};

export default AccountSettings;
