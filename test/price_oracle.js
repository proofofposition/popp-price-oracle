//
// this script executes when you run 'yarn test'
//
// you can also test remote submissions like:
// CONTRACT_ADDRESS=0x43Ab1FCd430C1f20270C2470f857f7a006117bbb yarn test --network rinkeby
//
// you can even run mint commands if the tests pass like:
// yarn test && echo "PASSED" || echo "FAILED"
//
const { expect } = require("chai");

const {ethers} = hre;

describe("🚩 Price Oracle user flows", function () {
    this.timeout(120000);

    let owner;
    let alice;

    // console.log("hre:",Object.keys(hre)) // <-- you can access the hardhat runtime env here

    describe("Popp PRice Oracle", function () {
        // `beforeEach` will run before each test, re-deploying the contract every
        // time. It receives a callback, which can be async.
        beforeEach(async function () {
            const PriceOracleFactory = await ethers.getContractFactory("PriceOracle");

            [owner, alice] = await ethers.getSigners();
            this.oracle = await PriceOracleFactory.deploy(100);
            expect(await this.oracle.getPrice()).to.equal(
                100
            );
        });

        describe("setPrice()", function () {
            it("Owner Should be able to set Price", async function () {
                await this.oracle.setPrice(1);
                expect(await this.oracle.getPrice()).to.equal(
                    1
                );
            });

            it("Should fail if a non-owner tries to set the price", async function () {
                await expect(
                    this.oracle.connect(alice).setPrice(1)
                ).to.be.revertedWith("Ownable: caller is not the owner");
            });
        });

        describe("centsToToken()", function () {
            it("Owner Should be able to get popp value for cents", async function () {
                await this.oracle.setPrice(100);
                expect(await this.oracle.centsToToken(100)).to.equal(
                    1000000000000000000n
                );

                await this.oracle.setPrice(584);
                expect(await this.oracle.centsToToken(100)).to.equal(
                    171232876712328767n
                );
            });
        });
    });
});
