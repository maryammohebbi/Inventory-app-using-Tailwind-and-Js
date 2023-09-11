import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelNewCategoryBtn = document.querySelector("#cancel-new-category");


class CategoryView{
    constructor(){
        addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
        toggleAddCategoryBtn.addEventListener("click", e => this.toggleAddCategory(e));
        cancelNewCategoryBtn.addEventListener("click", e => this.cancelNewCategory(e));
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
        categoryWrapper.classList.add("hidden");
        toggleAddCategoryBtn.classList.remove("hidden");
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

    toggleAddCategory(e){
        e.preventDefault();
        categoryWrapper.classList.remove("hidden");
        toggleAddCategoryBtn.classList.add("hidden");
    }

    cancelNewCategory(e){
        e.preventDefault();
        categoryWrapper.classList.add("hidden");
        toggleAddCategoryBtn.classList.remove("hidden");
    }
}

export default new CategoryView();