import { ethers } from "hardhat";

async function main() {
  console.log("Iniciando deploy do contrato HelloWorld...");

  // Obtém a conta que vai fazer o deploy
  const [deployer] = await ethers.getSigners();
  console.log("Conta que fará o deploy:", deployer.address);

  // Faz o deploy do contrato
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy("Olá, Mundo!");
  await helloWorld.waitForDeployment();

  console.log("Contrato HelloWorld deployado em:", await helloWorld.getAddress());

  // Lê a mensagem inicial
  const message = await helloWorld.getMessage();
  console.log("Mensagem inicial:", message);

  // Atualiza a mensagem
  console.log("Atualizando a mensagem...");
  await helloWorld.setMessage("Olá, Solidity!");
  
  // Lê a nova mensagem
  const newMessage = await helloWorld.getMessage();
  console.log("Nova mensagem:", newMessage);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 