document.addEventListener("DOMContentLoaded", () => {
    // DOM要素の取得
    const quantityInput = document.getElementById("quantity");
    const productTypeSelect = document.getElementById("productType");
    const optionsContainer = document.getElementById("optionsContainer");
    const productOptionSelect = document.getElementById("productOption");
    const propertyContainer = document.getElementById("propertyContainer");
    const productPropertyCheckbox = document.getElementById("productProperty");
    const calculateBtn = document.getElementById("calculateBtn");
    const totalPriceElement = document.getElementById("totalPrice");

    // エラーメッセージ表示用
    const errorContainer = document.createElement("div");
    errorContainer.id = "errorContainer";
    errorContainer.style.color = "red";
    errorContainer.style.marginTop = "10px";
    errorContainer.style.display = "none"; // 初期状態は非表示
    calculateBtn.insertAdjacentElement("afterend", errorContainer);

    // 商品タイプ変更時の表示切り替え
    productTypeSelect.addEventListener("change", () => {
        const selectedType = productTypeSelect.value;

        if (selectedType === "1") {
            optionsContainer.style.display = "none";
            propertyContainer.style.display = "none";
        } else if (selectedType === "2") {
            optionsContainer.style.display = "block";
            propertyContainer.style.display = "none";
        } else if (selectedType === "3") {
            optionsContainer.style.display = "none";
            propertyContainer.style.display = "block";
        }
    });

    // 総計計算
    calculateBtn.addEventListener("click", () => {
        const quantity = parseInt(quantityInput.value);

        // 入力値が無効な場合のエラーハンドリング
        if (isNaN(quantity) || quantity <= 0) {
            errorContainer.textContent = "Количество товара должно быть больше 0.";
            errorContainer.style.display = "block"; // エラーを表示
            totalPriceElement.textContent = 0; // 合計金額をリセット
            return;
        }

        // エラーを非表示
        errorContainer.style.display = "none";

        const productType = productTypeSelect.value;
        let totalPrice = 0;

        // 基本価格設定
        const basePrices = {
            "1": 10000,  // Тип 1
            "2": 20000,  // Тип 2
            "3": 30000,   // Тип 3
        };

        // 基本価格の計算
        totalPrice += (basePrices[productType] || 0) * quantity;

        // オプション価格追加 (Тип 2のみ)
        if (productType === "2") {
            const optionPrice = parseInt(productOptionSelect.value) || 0;
            totalPrice += optionPrice * quantity;
        }

        // プロパティ価格追加 (Тип 3のみ)
        if (productType === "3" && productPropertyCheckbox.checked) {
            totalPrice += 300 * quantity;
        }

        // 合計金額を表示
        totalPriceElement.textContent = totalPrice;
    });
});
