import BaseAPI from "./BaseAPI";

export default class ProductAPI extends BaseAPI {



    // FetchBranches = async (page, pageSize, accessToken) => {
    //     let payload = this.CreatePayload(null, this.GET, accessToken);
    //     const url = `api/MerchantBranchesReport?page=${page}&pageSize=${pageSize}`;
    //     const response = await fetch(url, payload);
    //     let responsePayLoad = this.ProcessResponse(response);
    //     return responsePayLoad;
    // }

    CreateProduct = async (productModel) => {
        let payload = this.CreatePayload(productModel, this.POST);
        const url = `https://gateway.xend.tk/product/api/Product_Catalog/RegisterProduct`;
        
        const response = await fetch(url, payload);
        let responsePayLoad = this.ProcessResponse(response);
        return responsePayLoad;
    }

}