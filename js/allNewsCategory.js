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
        const createNav = document.createElement('div');
        createNav.classList.add('navbar-nav');
        createNav.innerHTML = `
        <a type="button"  class="nav-link" onclick="searchByCategory('0'+${element.category_id})">${element.category_name}</a>
        `;
        navbar.appendChild(createNav);
    });

    //console.log(data);

}

const searchByCategory = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    loadCategoryNews(data.data);
    console.log(categoryId);
}
const loadCategoryNews = (newswData) => {
    const newsContainer = document.getElementById('news-container');
    newswData.forEach(element => {
        console.log(element);
        const creatDivElement = document.createElement('div');
        creatDivElement.innerHTML = `
            <div class="card mb-3" style="">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
`;
        newsContainer.appendChild(creatDivElement);
    });
    console.log(newswData);

}
allNewsCategory();