const products = [
    {
        id: 1,
        title: "bic",
        category: "pen",
        quantity: 10,
        createdAt: "2022-12-01T10:47:26.889Z",
    },
    {
        id: 2,
        title: "tandis",
        category: "notebook",
        quantity: 8,
        createdAt: "2022-11-01T10:47:26.889Z",
    },
    {
        id: 3,
        title: "ilia",
        category: "notebook",
        quantity: 4,
        createdAt: "2022-12-01T11:47:26.889Z",
    },
];

const categories =[
    {
        id: 1,
        title: "pen",
        description: "stationary and writing supplies",
        createdAt: "2022-12-01T10:47:26.889Z",
    },
    {
        id: 2,
        title: "notebook",
        description: "all sort of notebooks for paper supplies",
        createdAt: "2022-11-01T10:47:26.889Z",
    },
];

export default class Storage{
    //add new category
    //save category
    //getAllCategories

    static getAllCategories(){
        //categories, products => localstorage
        const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
        // sort descending
        const sortedCategories = savedCategories.sort((a, b)=>{
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sortedCategories;
    };

    static saveCategory(categoryToSave){
        //taking all the categories first in order to compare and also push into them the new one
        const savedCategories = Storage.getAllCategories();
        //
        const existedItem = savedCategories.find(c => c.id === categoryToSave.id);
        if(existedItem){
            // edit
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;
        }else{
            // new
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }

        localStorage.setItem("category", JSON.stringify(savedCategories));
    };

    static getAllProducts(sort = "newest"){
       const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
       const sortedProducts = savedProducts.sort((a, b)=>{
            if(sort === "newest"){
                return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            } else if(sort === "oldest"){
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            }
        });
        return sortedProducts;
    };

    static saveProduct(productToSave){
        const savedProducts = Storage.getAllProducts();

        const existedProduct = savedProducts.find(p => p.id === productToSave.id);
        if(existedProduct){
            existedProduct.title = productToSave.title;
            existedProduct.category = productToSave.category;
            existedProduct.quantity = productToSave.quantity;
        }else{
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }
        localStorage.setItem("products", JSON.stringify(savedProducts));
    }

    static deleteProduct(id){
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter(p => p.id !== parseInt(id));
        localStorage.setItem("products", JSON.stringify(filteredProducts));
    }
}
