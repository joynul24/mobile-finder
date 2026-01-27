const loadPhoneApi = async (searchText) => {
    const res = await fetch(searchText ? `https://openapi.programming-hero.com/api/phones?search=${searchText}` : `https://openapi.programming-hero.com/api/phones?search=phone`);
    const data = await res.json();
    displayAllPhones(data.data)
    document.getElementById("spinner").classList.add("hidden");
}


const displayAllPhones = (phones) => {
    const showPhonesContainer = document.getElementById("phones-container");
    showPhonesContainer.innerHTML = "";
    phones.forEach(phone => {
        const { image, phone_name } = phone || {};
        const randomPrice = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
        const div = document.createElement("div");
        div.classList.add('card', 'shadow-lg', 'bg-base-100')
        div.innerHTML = `
    <figure class="px-10 pt-10">
      <img
      src="${image}"
      alt="Phone"
      class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">${phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <h3 class="text-xl font-bold">$${randomPrice}</h3>
    <div class="card-actions">
      <button class="btn btn-regular mt-2">Show Details</button>
    </div>
    </div>
      `
        showPhonesContainer.append(div)
    })
}


const handleSearchBtn = () => {
    const searchText = document.getElementById("input-search").value;
    document.getElementById("spinner").classList.remove("hidden");
    setTimeout(() => {
        loadPhoneApi(searchText)
    }, 3000);
}


loadPhoneApi()