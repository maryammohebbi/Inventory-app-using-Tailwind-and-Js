import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");


class CategoryView{
    constructor(){
        addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
        this.categories = [];
    }

    addNewCategory(e){
        e.preventDefault();
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if(!title || !description) return;
        Storage.saveCategory({ title, description });
        this.categories = Storage.getAllCategories();
        // update DOM: update select option in category
        this.createCategoriesList();
        categoryTitle.value = "";
        categoryDescription.value = "";
    }

    setApp(){
        this.categories = Storage.getAllCategories();
    }

    createCategoriesList(){

        let result = `<option class="text-slate-400 bg-slate-800" value="">Select a category</option>`;
        this.categories.forEach (c => {
            result += `<option class="text-slate-400 bg-slate-800" value=${c.id}> ${c.title} </option>`;
        });

        const categoryDOM = document.getElementById("product-category");
        categoryDOM.innerHTML = result;

    }
}

export default new CategoryView();