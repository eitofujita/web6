document.addEventListener("DOMContentLoaded", function () {
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsDiv = document.getElementById("optionsDiv");
    const propertyDiv = document.getElementById("propertyDiv");

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener("change", handleServiceTypeChange);
    });

    function handleServiceTypeChange() {
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;

        if (selectedType === "type1") {
            optionsDiv.classList.add("hidden");
            propertyDiv.classList.add("hidden");
        } else if (selectedType === "type2") {
            optionsDiv.classList.remove("hidden");
            propertyDiv.classList.add("hidden");
        } else if (selectedType === "type3") {
            optionsDiv.classList.add("hidden");
            propertyDiv.classList.remove("hidden");
        }
    }

    handleServiceTypeChange(); 
});

function calculatePrice() {
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const serviceType = document.querySelector('input[name="serviceType"]:checked').value;
    let basePrice = 1000;

    if (serviceType === "type2") {
        basePrice += 500;
    } else if (serviceType === "type3") {
        if (document.getElementById("property").checked) {
            basePrice += 300; 
        }
    }

    const totalPrice = basePrice * quantity;
    document.getElementById("totalPrice").textContent = totalPrice;
}
