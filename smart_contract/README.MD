## Build Contract
`bash .build.sh`

## Deploy Contract
`near dev-deploy out/kyc-contract.wasm`
- Get Contract ID:
  example: dev-1655624955810-47042894622488
## Init Contract
`near call dev-1655624955810-47042894622488 new '{"owner_id":"ted01.testnet"}' --accountId ted01.testnet`
## Get Hash By Key
`near view dev-1655624955810-47042894622488 get_hash '{"key":"ted01"}'  `

## Sent Hash to Blockchain
`near call dev-1655624955810-47042894622488 sent_hash '{"key":"ted01", "hash": "test"}'  --accountId "ted01.testnet" --deposit 0.01`
