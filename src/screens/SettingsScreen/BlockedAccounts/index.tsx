import Follower from "@/components/Follower";
import NoBlockedUsers from "./NoBlockedUsers";
import styles from "./BlockedAccounts.module.sass";

import { myFollowers } from "@/mocks/followers";

type BlockedAccountsProps = {};

const BlockedAccounts = ({}: BlockedAccountsProps) =>
    myFollowers.length > 0 ? (
        <div className={styles.accounts}>
            {myFollowers.map((account: any) => (
                <Follower item={account} key={account.id} isBlocked />
            ))}
        </div>
    ) : (
        <NoBlockedUsers />
    );

export default BlockedAccounts;
