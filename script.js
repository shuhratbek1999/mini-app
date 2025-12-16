$(document).ready(function () {
  const saveBtn = simpleButton(
    "Start",
    "white",
    "#3DA88B",
    {
      href: "second.html",
    },
    "95%"
  );
  const vacancyBtn = simpleButton(
    "Place a vacancy",
    "#3DA88B",
    "#E8EEEE",
    function (e, $btn) {
      alert("Ma'lumotlar saqlandi!");
      $btn.changeText("Saqlangan ✓").changeBgColor("#3DA88B").disable();
    },
    "95%"
  );
  $("#info").append(saveBtn, vacancyBtn);

  const secondBtn = simpleButton(
    "Next",
    "#3DA88B",
    "transparent",
    {
      href: "finish.html",
      className: "finish_next-btn",
    },
    "100%"
  );
  $("#second_btn").append(secondBtn);

  const finishBtn = simpleButton(
    "Finish",
    "#FFFF",
    "#3DA88B",
    {
      href: "jobs.html",
      className: "finish_next-btn",
    },
    "100%"
  );
  $("#finishBtn").append(finishBtn);

  const jobHero = simpleButton(
    "Place a job",
    "#FFFF",
    "#3DA88B",
    {
      href: "jobs.html",
      className: "finish_next-btn",
    },
    "155px"
  );
  $("#infoBtn").append(jobHero);

  const footerBtn = simpleButton(
    "Place a job",
    "#FFFF",
    "#3DA88B",
    {
      href: "jobs.html",
      className: "finish_next-btn",
    },
    "100%"
  );
  $("#footerBtn").append(footerBtn);

  $(".toggle-btn").on("click", function () {
    const parent = $(this).closest(".list_item");
    const collapse = parent.find(".collapse");

    collapse.slideToggle(300);

    $(this).find(".plus").toggle();
    $(this).find(".minus").toggle();
  });
  $("#formTop").baseInput({
    label: "Who are you looking for? ",
    placeholder: "Specify the position and level",
    name: "company",
    required: true,
  });

  $("#formTop").baseInput({
    label: "City",
    placeholder: "Specify the job location",
    name: "company",
    required: true,
  });
  $("#indicate").baseInput({
    label: "Indicate the required experience",
    placeholder: "Example: 1-2 years",
    name: "company",
    required: true,
  });

  $("#salary").baseInput({
    label: "Salary, £",
    placeholder: "Specify the offered salary",
    name: "company",
    required: true,
  });

  $("#companyInput").baseInput({
    label: "Company name",
    placeholder: "Full or short company name",
    name: "company",
    required: true,
  });

  $("#companyInput").baseInput({
    label: "Website link",
    placeholder: "https:// ",
    name: "company",
    required: true,
  });

  $("#companyInput").baseInput({
    label: "Instagram",
    placeholder: "Specify the account name",
    name: "company",
    required: false,
  });

  $("#contactInput").baseInput({
    label: "Contact person",
    placeholder: "Provide the name of the contact ",
    name: "company",
    required: true,
  });
  $("#contactInput").baseInput({
    label: "Method of contact ",
    placeholder: "Email or website link",
    name: "company",
    required: true,
  });

  // jobs apply

  $("#Apply").on("click", function () {
    window.location.href = "jobsDetails.html";
  });
  const $input = $("#searchInput");
  const $clear = $(".icon.clear");

  $input.on("input", function () {
    const $thisClear = $(this).siblings(".icon.clear"); // elementni input bo‘yicha topish
    if ($(this).val().length > 0) {
      $thisClear.css("display", "flex"); // show() o‘rniga
    } else {
      $thisClear.hide();
    }
  });

  $(".icon.clear").on("click", function () {
    const $thisInput = $(this).siblings("#searchInput");
    $thisInput.val("").focus();
    $(this).hide();
  });

  $("#backBtn").on("click", function () {
    console.log(window.history);

    window.history.back();
  });

  // location modal

  $(".filter_item")
    .first()
    .on("click", function () {
      $("#locationModal").show();
    });

  // Tag bosilganda
  function updateCounter() {
    const count = $(".keys_item").length;
    $(".result_title").text(`Clear Filters (${count})`);
  }
  $(".tag").on("click", function () {
    const value = $(this).text().trim();

    // Agar allaqachon mavjud bo'lsa — qo'shmaymiz
    let exists = false;
    $(".keys_item span").each(function () {
      if ($(this).text() === value) {
        exists = true;
      }
    });
    if (exists) return;

    // Chip yaratamiz
    const chip = $(`
      <div class="keys_item" data-value="${value}">
        <span>${value}</span>
        <img src="./images/filterClose.png" alt="remove" />
      </div>
    `);
    $(".filter_keys").append(chip);

    updateCounter();

    // modal yopiladi
    $("#locationModal").hide();
  });
  $(document).on("click", ".keys_item img", function () {
    $(this).closest(".keys_item").remove();
    updateCounter();
  });

  // X bosilganda
  $(".close-modal").on("click", function () {
    $(".keys_item").remove();
    updateCounter();
    $("#locationModal").hide();
  });

  const minSalary = 10000;
  const maxSalary = 100000;

  let dragging = false;

  // Salary modal ochish
  $(".filter_item")
    .eq(2)
    .on("click", function () {
      $("#salaryModal").show();
    });

  // Yopish
  $(".close-salary").on("click", function () {
    $("#salaryModal").hide();
  });

  // Drag boshlash
  $(".range-thumb").on("mousedown touchstart", function (e) {
    dragging = true;
  });

  // Drag tugash
  $(document).on("mouseup touchend", function () {
    dragging = false;
  });

  // Harakat
  $(document).on("mousemove touchmove", function (e) {
    if (!dragging) return;

    const track = $(".range-track");
    const trackOffset = track.offset().left;
    const trackWidth = track.width();

    let clientX = e.pageX || e.originalEvent.touches[0].pageX;
    let percent = ((clientX - trackOffset) / trackWidth) * 100;

    percent = Math.max(0, Math.min(100, percent));

    // UI
    $(".range-fill").css("width", percent + "%");
    $(".range-thumb").css("left", percent + "%");

    // Salary hisoblash
    const salary = Math.round(
      minSalary + (percent / 100) * (maxSalary - minSalary)
    );

    $("#salaryAmount").text(salary.toLocaleString());
  });
});
