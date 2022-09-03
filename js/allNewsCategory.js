const allNewsCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategory(data.data.news_category);
}
const displayAllCategory = (data) => {
    const navbar = document.getElementById('all-category');
    const practiceDiv = document.getElementById('practice-div');
    data.forEach(element => {
        console.log(element.category_id);
        console.log(element.category_name);
        const createNav = document.createElement('div');
        createNav.classList.add('navbar-nav');
        createNav.innerHTML = `
        <a class="nav-link" href="#">${element.category_name}</a>
        `;
        navbar.appendChild(createNav);
    });

    console.log(data);

}
allNewsCategory();