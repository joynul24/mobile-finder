const loadPhoneApi = async (searchText) => {
  const res = await fetch(searchText ? `https://openapi.programming-hero.com/api/phones?search=${searchText}` : `https://openapi.programming-hero.com/api/phones?search=phone`);
  const data = await res.json();
  displayAllPhones(data.data)
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("input-search").value = "";
};



// reusable render function
const renderPhones = (phones) => {
  const showPhonesContainer = document.getElementById("phones-container");
  showPhonesContainer.innerHTML = "";

  phones.forEach(phone => {
    const { slug, image, phone_name } = phone || {};
    const randomPrice = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;

    const div = document.createElement("div");
    div.classList.add('card', 'shadow-lg', 'bg-base-100');
    div.innerHTML = `
      <figure class="px-10 pt-10">
        <img src="${image}" alt="Phone" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone_name}</h2>
        <p class="text-gray-700">There are many variations of passages available, but the majority have suffered</p>
        <h3 class="text-xl font-bold">$${randomPrice}</h3>
        <div class="card-actions">
          <button onclick="showDetails('${slug}')" class="btn btn-regular mt-2">Show Details</button>
        </div>
      </div>
    `;
    showPhonesContainer.append(div);
  });
};



const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const details = (data.data);
  
  const modalBox = document.querySelector("#my_modal_5 .modal-box");
  modalBox.innerHTML = `
  <h2 class="text-xl md:text-2xl font-bold text-center">${details.name}</h2>
  <div class="flex flex-col md:flex-row gap-6 mt-4">
    <!-- Image -->
    <div class="flex-1 flex justify-center">
      <img src="${details.image}" alt="${details.name}" class="w-40 md:w-60 rounded shadow-md" />
    </div>

    <!-- Info -->
    <div class="flex-1 space-y-2 text-sm md:text-base">
      <p><strong>Brand:</strong> ${details.brand}</p>
      <p><strong>Release Date:</strong> ${details.releaseDate || "Not Available"}</p>
      <p><strong>Storage:</strong> ${details.mainFeatures.storage}</p>
      <p><strong>Display Size:</strong> ${details.mainFeatures.displaySize}</p>
      <p><strong>Chipset:</strong> ${details.mainFeatures.chipSet}</p>
      <p><strong>Memory:</strong> ${details.mainFeatures.memory}</p>
      <p><strong>Sensors:</strong> ${details.mainFeatures.sensors.join(", ")}</p>
    </div>
  </div>

  <!-- Others Section -->
  <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
    <p><strong>WLAN:</strong> ${details.others?.WLAN || "Not Available"}</p>
    <p><strong>Bluetooth:</strong> ${details.others?.Bluetooth || "Not Available"}</p>
    <p><strong>GPS:</strong> ${details.others?.GPS || "Not Available"}</p>
    <p><strong>NFC:</strong> ${details.others?.NFC || "Not Available"}</p>
    <p><strong>Radio:</strong> ${details.others?.Radio || "Not Available"}</p>
    <p><strong>USB:</strong> ${details.others?.USB || "Not Available"}</p>
  </div>

  <!-- Close Button -->
  <div class="modal-action">
    <form method="dialog">
      <button class="btn w-full md:w-auto">Close</button>
    </form>
  </div>
`;

  document.getElementById("my_modal_5").showModal();
};




const displayAllPhones = (phones) => {
  const limitedPhones = phones.slice(0, 6);
  renderPhones(limitedPhones);

  // Show All button container
  const showAllBtnContainer = document.getElementById("show-all-btn-container");
  showAllBtnContainer.innerHTML = "";

  if (phones.length > 6) {
    const showAllBtn = document.createElement("button");
    showAllBtn.innerText = "Show All Phones";
    showAllBtn.classList.add("btn", "bg-[#0D6EFD]", "text-white", "border-none", "rounded-md", "mt-10");

    showAllBtn.onclick = () => {
      renderPhones(phones);
      showAllBtnContainer.innerHTML = "";
    };

    showAllBtnContainer.append(showAllBtn);
  }
};




const handleSearchBtn = () => {
  const searchText = document.getElementById("input-search").value;
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(() => {
    loadPhoneApi(searchText)
  }, 3000);
};



loadPhoneApi()