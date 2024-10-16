import hre from "hardhat";

async function main() {

    
    function logContractDeployed(contractName: string, contract: any) {
        console.log(`${contractName} deployed to: ${contract.target}`);
    }

    // Deploy Collateral Manager
    const Coll = await hre.ethers.getContractFactory("MellowFinanceCollateralManager");
    const coll = await Coll.deploy();
    await coll.waitForDeployment();
    logContractDeployed("CollateralManager", coll);

    // Deploy Loan Manager
    const Loan = await hre.ethers.getContractFactory("MellowFinanceLoanManager");
    const loan = await Loan.deploy(coll.target);
    await loan.waitForDeployment();
    logContractDeployed("LoanManager", loan);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
