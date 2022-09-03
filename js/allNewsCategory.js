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
        <a type="button"  class="nav-link" onclick="searchByCategory('0'+${element.category_id},'${element.category_name}')">${element.category_name}</a>
        `;
        navbar.appendChild(createNav);
    });

    //console.log(data);

}

const searchByCategory = async (categoryId, categoryName) => {
    const url1 = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url1);
    const data = await res.json();
    loadCategoryNews(data.data, categoryName);
    // loadCategoryNumber(categoryNumber);

}
/*const loadCategoryNumber = async (categoryNumber) => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    const itemArry = data.data.news_category;
    const categoryNumberField = document.getElementById('category-number');

    itemArry.forEach(element => {
        if (element.category_id == categoryNumber) {
            const itemNumberDisplay = document.createElement('div');
            itemNumberDisplay.innerHTML = `
                    <h4>${categoryNumber} items found for category${element.category_name}</h4>
                `;
            categoryNumberField.appendChild(itemNumberDisplay);
            console.log(element.category_id, categoryNumber);
        }
    });
    console.log('from load', itemArry);
}*/

const loadCategoryNews = (newswData, newsName) => {
    console.log(newsName);
    let count = 0;
    const newsContainer = document.getElementById('news-container');
    //newsContainer.innerHTML = ``;
    newswData.forEach(element => {
        console.log(element);
        const creatDivElement = document.createElement('div');
        creatDivElement.innerHTML = `
            <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.image_url}" class="img-fluid rounded-start" style="height:265px" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.details.slice(0, 200)}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <img style="height:50px;weight:50px" class="rounded-circle me-2" src="${element.author.img}">
                                    <div class="d-flex flex-column">
                                        <span>${element.author.name}</span>
                                        <small>${element.author.published_date}</small>
                                    </div>
                                </div>
                                <div>
                                    <span class="fw-bold">${element.total_view}M</span>
                                </div>
                                <div class="d-flex">
                                    <small class="me-2">Rating:</small>
                                    <div>
                                        <span>${element.rating.badge},</span>
                                        <span>${element.rating.number}</span>
                                    </div>
                                </div>
                                <div>
                                <button type="button" class="btn btn-primary">See More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;
        newsContainer.appendChild(creatDivElement);
        count = count + 1;
    });
    const categoryNumberField = document.getElementById('category-number');
    const itemNumberDisplay = document.createElement('div');
    itemNumberDisplay.innerHTML = `
            <h4>${count} items found for category${newsName}</h4>
        `;
    categoryNumberField.appendChild(itemNumberDisplay);
    console.log(newswData, count);

}
allNewsCategory();