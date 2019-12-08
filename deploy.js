fs = require('fs')
Web3 = require('web3')
web3 = new Web3("http://localhost:8545")

bytecode = fs.readFileSync('__contracts_Transaction_sol_Transaction.bin').toString()
abi = JSON.parse(fs.readFileSync('__contracts_Transaction_sol_Transaction.abi').toString())


deployedContract = new web3.eth.Contract(abi)
deployedContract.deploy({
    data: bytecode,
    arguments: null
  }).send({
    from: '0xb596a83d5BA6040076955E42e7eC55C1BA522D60',
    gas: 1500000,
    gasPrice: web3.utils.toWei('0.0000000000003', 'ether')
  }).then((newContractInstance) => {
    deployedContract.options.address = newContractInstance.options.address
    console.log(newContractInstance.options.address)
  });