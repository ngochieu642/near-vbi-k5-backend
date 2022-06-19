use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, ext_contract, near_bindgen, AccountId, Balance, BorshStorageKey, Gas, PanicOnDefault,
    Promise, PromiseOrValue, PromiseResult,
};

#[derive(BorshDeserialize, BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    HashKey,
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
#[near_bindgen]
pub struct KycContract {
    pub owner_id: AccountId,
    pub hashs: LookupMap<String, String>,
    pub is_paused: bool,
}
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct KycInfo {
    pub is_paused: bool,
}

#[near_bindgen]
impl KycContract {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        KycContract {
            owner_id: owner_id,
            hashs: LookupMap::new(StorageKey::HashKey),
            is_paused: false,
        }
    }

    #[payable]
    pub fn update_hash(&mut self, key: String , hash: String) {
        assert!(
            env::attached_deposit() > 1,
            "ERR_DEPOSIT_GREATER_THAN_ONE_YOCTO"
        );
        assert!(!self.is_paused, "ERR_CONTRACT_PAUSED");
        self.hashs.insert(&key, &hash);
    }

    pub fn get_hash(&self, key: String) -> String {
        let hash: String = self.hashs.get(&key).unwrap();
        hash
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
