// Function to show property details
function showDetails(button) {
    var currentRow = $(button).closest('tr');
    var detailsRow = currentRow.next('.details-row');

    if (detailsRow.length > 0) {
        detailsRow.remove();
    } else {
        $('.details-row').remove();

        var rent = currentRow.find('td:nth-child(3)').text().trim();
        var details = currentRow.find('td:nth-child(4)').text().trim();
        var city = currentRow.find('td:nth-child(5)').text().trim();

        var additionalInfo = "";
        var imageUrl = "";

        
        if (city === 'دمشق1') {
            additionalInfo = "أقرب مدرسة: مدرسة دمشق الأساسية";
            imageUrl = 'image/damascus1.png'; 
        } else if (city === 'دمشق2') {
            additionalInfo = "مسافة إلى الحديقة العامة: 1 كم";
            imageUrl = 'image/damascus2.png'; 
        } else if (city === 'حمص1') {
            additionalInfo = "مسافة إلى المركز التجاري: 5 كم";
            imageUrl = 'image/homs1.png'; 
        } else if (city === 'حمص2') {
            additionalInfo = "مسافة إلى المستشفى: 2 كم";
            imageUrl = 'image/homs2.png'; 
        } else if (city === 'لاذقية1') {
            additionalInfo = "إطلالة على البحر: نعم";
            imageUrl = 'image/latakia1.png'; 
        } else if (city === 'لاذقية2') {
            additionalInfo = "منظر جبلي خلاب";
            imageUrl = 'image/latakia2.png'; 
        } else if (city === 'درعا1') {
            additionalInfo = "حديقة خاصة: 100 متر مربع";
            imageUrl = 'image/daraa1.png'; 
        } else if (city === 'درعا2') {
            additionalInfo = "مسافة إلى المسجد الكبير: 500 م";
            imageUrl = 'image/daraa2.png'; 
        } else if (city === 'سويدا1') {
            additionalInfo = "منطقة هادئة وآمنة";
            imageUrl = 'image/suwayda1.png'; 
        } else if (city === 'سويدا2') {
            additionalInfo = "قرب الحديقة العامة";
            imageUrl = 'image/suwayda2.png'; 
        }

        var newRow = `
            <tr class="details-row">
                <td colspan="${currentRow.find('td').length}">
                    <div>
                        <img src="${imageUrl}" alt="صورة العقار">
                        <p><strong>الايجار الشهري:</strong> ${rent}</p>
                        <p><strong>التفاصيل:</strong> ${details}</p>
                        <p><strong>المدينة:</strong> ${city}</p>
                        <p><strong>معلومات إضافية:</strong> ${additionalInfo}</p>
                    </div>
                </td>
            </tr>
        `;

        currentRow.after(newRow);
    }
}

$(document).ready(function () {
    // Function to open popup
    $('#openPopupBtn').click(function () {
        openPopup(); 
    });

    // Function to close popup
    $('#closePopupBtn').click(function () {
        $('#popup').fadeOut();
    });

    // Function to calculate total price of selected properties
    $('#submitBtn').click(function () {
        var selectedProperties = $('input[type="checkbox"]:checked').closest('tr'); 
        var totalPrice = 0;

        selectedProperties.each(function () {
            var priceText = $(this).find('td:nth-child(3)').text().trim(); 
            var price = parseInt(priceText.replace(/[^\d]/g, '')); 
            if (!isNaN(price)) {
                totalPrice += price; 
            }
        });

        $('#totalPriceMessage').text('السعر الإجمالي: ' + totalPrice + ' ليرة سورية'); 
    });

    // Function to submit form and show success message
    $('#submitFormBtn').click(function () {
        submitForm(); 
    });

    // Function to close success popup
    $('#closeSuccessPopupBtn').click(function () {
        $('#successPopup').fadeOut();
    });

    // Function to show property details
    $('.details-btn').click(function () {
        showDetails(this);
    });
});

// Function to submit form and show success message
function submitForm() {
    var form = document.getElementById('applicationForm');

  
    if (form.checkValidity()) {
        var totalPrice = calculateTotalPrice(); 

        if (totalPrice > 0) {
            openSuccessPopup(totalPrice); 
        } else {
            alert('الرجاء تحديد عقار واحد على الأقل لاستكمال الطلب.'); 
        }
    } else {
        form.reportValidity(); 
    }
}

// Function to calculate total price of selected properties
function calculateTotalPrice() {
    var totalPrice = 0;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var row = checkbox.parentNode.parentNode;
            var priceCell = row.cells[2];
            var priceText = priceCell.textContent.trim();
            var price = parseInt(priceText); 
            if (!isNaN(price)) {
                totalPrice += price;
            }
        }
    });

    return totalPrice;
}

// Function to open popup
function openPopup() {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
    }
}

// Function to open success popup with total price
function openSuccessPopup(totalPrice) {
    var popup = document.getElementById('successPopup');
    if (popup) {
        var message = `مجموع أسعار العقارات المختارة: ${totalPrice} ليرة سورية<br>تم تسجيل الطلب بنجاح.`;
        popup.innerHTML = message;
        popup.style.display = 'block';
        setTimeout(function () {
            closeSuccessPopup();
        }, 5000);

    }
}

// Function to close success popup
function closeSuccessPopup() {
    var popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}


// Function to close popup
function closePopup() {
    var popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

