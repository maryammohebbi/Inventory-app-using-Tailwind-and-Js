import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const addNewProductBtn = document.querySelector("#add-new-product");
const productCategories = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const sortProducts = document.querySelector("#sort-products");


class ProductView{
    constructor(){
        addNewProductBtn.addEventListener("click", (e)=> this.addNewProduct(e));
        searchInput.addEventListener("input", (e) => this.searchProducts(e));
        sortProducts.addEventListener("change", e => this.sortProducts(e));
        this.products = [];
    }

    addNewProduct(e){
        e.preventDefault();
        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = productCategories.value;
        if(!title || !quantity || !category) return;
        Storage.saveProduct({title , quantity, category});
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
        productTitle.value = "";
        productQuantity.value = "";
    }
    setApp(){
        this.products = Storage.getAllProducts();
    }

    createProductsList(products){
        let result = "";
        products.forEach(p => {
            const selectedCategory= Storage.getAllCategories().find(c => c.id == p.category);

            result += `
                <div class="flex items-center justify-between mb-5">
                    <span class="text-slate-300 text-sm font-bold">${p.title}</span>
                    <div class="flex items-center gap-x-2">
                        <span class="text-slate-400 text-sm">${new Date().toLocaleDateString("fa-IR")}</span>
                        <span class="text-slate-500 border border-slate-500 px-2 rounded-xl">${selectedCategory.title}</span>
                        <span class="border-2 border-slate-300 rounded-full w-6 h-6 bg-slate-500 font-bold flex items-center justify-center p-1 text-slate-300">${p.quantity}</span>
                        <button class="text-red-400 text-sm font-bold" data-id= ${p.id}>delete</button>
                    </div>
                </div>
            `
        })
        const productList = document.querySelector("#product-list");
        productList.innerHTML = result;
    }

    searchProducts(e){
        const value = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(value));
        this.createProductsList(filteredProducts);
    }

    sortProducts(e){
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProductsList(this.products);
    }
}

export default new ProductView();