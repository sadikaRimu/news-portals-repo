const allNewsCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayAllCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}
const displayAllCategory = (data) => {
    const navbar = document.getElementById('navbarNavAltMarkup');

    data.forEach(element => {
        const createNav = document.createElement('div');
        createNav.classList.add('navbar-nav');
        createNav.innerHTML = `
        <a type="button"  class="nav-link" onclick="searchByCategory('${element.category_id}','${element.category_name}')">${element.category_name}</a>
        `;
        navbar.appendChild(createNav);

    });


    //console.log(data);

}

const searchByCategory = async (categoryId, categoryName) => {
    toggleSpinner(true);
    const url1 = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const res = await fetch(url1);
        const data = await res.json();
        loadCategoryNews(data.data, categoryName);

    }
    catch (error) {
        console.log(error);
    }


}
const loadCategoryNews = (newswData, newsName) => {
    let count = 0;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newswData.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    newswData.forEach(element => {
        const creatDivElement = document.createElement('div');

        creatDivElement.innerHTML = `
            <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.image_url}" class="img-fluid rounded-start"  alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text text-truncate">${element.details}</p>
                            <div class="d-flex justify-content-between mt-5">
                                <div class="d-flex">
                                    <img style="height:50px;weight:50px" class="rounded-circle me-2" src="${element.author.img}">
                                    <div class="d-flex flex-column">
                                        <span>${element.author.name ? element.author.name : 'not available'}</span>
                                        <small class="text-muted">${element.author.published_date}</small>
                                    </div>
                                </div>
                                <div>
                                    <span class="fw-bold">${element.total_view + 'M views'}</span>
                                </div>
                                <div class="d-flex">
                                    <small class="me-2">Rating:</small>
                                    <div>
                                        <span>${element.rating.badge},</span>
                                        <span>${element.rating.number}</span>
                                    </div>
                                </div>
                                <div>
                                <button onclick="loadModalDetails('${element._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">See More</button>
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
    categoryNumberField.innerHTML = ``;
    const itemNumberDisplay = document.createElement('div');
    itemNumberDisplay.innerHTML = `
            <h6>${count ? count + 'items found for category' : 'no item found for'}   ${newsName}</h6>
        `;
    categoryNumberField.appendChild(itemNumberDisplay);
    toggleSpinner(false);
}
const loadModalDetails = async (newsDetailId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsDetailId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }

}
const displayNewsDetails = (newsDetailsData) => {
    const newsTitle = document.getElementById('newsDetailModalLabel');
    const newsDtailsBodyField = document.getElementById('news-details-body');
    newsDetailsData.forEach(element => {
        console.log(element);
        newsTitle.innerText = element.title;
        newsDtailsBodyField.innerHTML = `
        <div>
        <span><strong>Author Name:</strong>${element.author.name ? element.author.name : 'no data found'}</span><br><span><strong>Published Date:</strong>${element.author.published_date ? element.author.published_date : 'no data found'}</span><br>
        <p><strong>Total Views:</strong>${element.total_view ? element.total_view + 'M' : 'no data found'}</p>
        <strong>Details:</strong><p>${element.details}</p>
        </div>
        `;
    });
}
const toggleSpinner = (isLoading) => {
    const loaderField = document.getElementById('loader');
    if (isLoading) {
        loaderField.classList.remove('d-none');
    }
    else {
        loaderField.classList.add('d-none');
    }
}
allNewsCategory();