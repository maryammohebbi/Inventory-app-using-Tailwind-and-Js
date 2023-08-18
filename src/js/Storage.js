const products = [];

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
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
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
        const existedItem = savedCategories.find(c => c.id = categoryToSave.id);
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
}