//All logics and data filtiring are done here
var dal = require('./dal');
var bl = {};
bl.getAllProducts = async() => {
    const response = await dal.getAllProducts();
    if (!response) throw new Error('Error occurred while fetching details.Try after sometime.');
    else return response;
}
bl.addProduct = async(data) => {
    const products = await dal.getAllProducts();
    if (checkDupPName(products, data)) throw new Error(`Product with name ${data.pName} already exits.`);
    const response = await data.addProduct(data);
    if (!response) throw new Error('Error occurred while saving details.Try after sometime.');
    else return bl.getAllProducts();

}
var checkDupPName = function(products, data) {
    if (!products.length) return false;
    const pNames = products.map((x) => { return x.pName; });
    if (!pNames.includes(data.pName)) return false;
    else return true;
}
bl.getProductByName = async(pName) => {
    const response = await dal.getProductByName(pName);
    if (!response) throw new Error('Error occurred while fetching details.Try after sometime.');
    else return response;
}

module.exports = bl;