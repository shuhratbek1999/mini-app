$(document).ready(function () {
  // --- Buttons setup ---
  const saveBtn = simpleButton(
    "Start",
    "white",
    "#3DA88B",
    { href: "second.html" },
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
    { href: "finish.html", className: "finish_next-btn" },
    "100%"
  );
  $("#second_btn").append(secondBtn);

  const finishBtn = simpleButton(
    "Finish",
    "#FFFF",
    "#3DA88B",
    { href: "jobs.html", className: "finish_next-btn" },
    "100%"
  );
  $("#finishBtn").append(finishBtn);

  const jobHero = simpleButton(
    "Place a job",
    "#FFFF",
    "#3DA88B",
    { href: "jobs.html", className: "finish_next-btn" },
    "155px"
  );
  $("#infoBtn").append(jobHero);

  const footerBtn = simpleButton(
    "Place a job",
    "#FFFF",
    "#3DA88B",
    { href: "jobs.html", className: "finish_next-btn" },
    "100%"
  );
  $("#footerBtn").append(footerBtn);

  // --- Collapse toggle ---
  $(".toggle-btn").on("click", function () {
    const parent = $(this).closest(".list_item");
    const collapse = parent.find(".collapse");
    collapse.slideToggle(300);
    $(this).find(".plus").toggle();
    $(this).find(".minus").toggle();
  });

  // --- Search input & clear ---
  const $input = $("#searchInput");
  $input.on("input", function () {
    $(this)
      .siblings(".icon.clear")
      .toggle($(this).val().length > 0);
    filterJobs();
  });
  $(".icon.clear").on("click", function () {
    const $input = $(this).siblings("#searchInput");
    $input.val("").focus();
    $(this).hide();
    filterJobs();
  });

  // --- Location tags filter ---
  function updateCounter() {
    $(".result_title").text(`Clear Filters (${$(".keys_item").length})`);
  }

  $(".tag").on("click", function () {
    const value = $(this).text().trim();
    if ($(".keys_item span").filter((i, e) => $(e).text() === value).length)
      return;
    $(".filter_keys").append(
      `<div class="keys_item" data-value="${value}"><span>${value}</span><img src="./images/filterClose.png" alt="remove" /></div>`
    );
    updateCounter();
    $("#locationModal").hide();
    resetLocationIcons();
    filterJobs();
  });

  $(document).on("click", ".keys_item img", function () {
    $(this).closest(".keys_item").remove();
    updateCounter();
    filterJobs();
  });

  $(".close-modal").on("click", function () {
    $(".keys_item").remove();
    updateCounter();
    $("#locationModal").hide();
    resetLocationIcons();
  });

  function resetLocationIcons() {
    const firstItem = $(".filter_item").first();
    firstItem.find(".pastga").addClass("active");
    firstItem.find(".yuqoriga").removeClass("active");
  }

  $(".filter_item")
    .first()
    .on("click", function () {
      $(this).find(".pastga").removeClass("active");
      $(this).find(".yuqoriga").addClass("active");
      $("#locationModal").show();
    });

  // --- Salary filter ---
  const minSalary = 10000;
  const maxSalary = 100000;
  let currentSalary = maxSalary;
  let dragging = false;

  $(".filter_item")
    .eq(2)
    .on("click", function () {
      $(this).find(".pastga").removeClass("active");
      $(this).find(".yuqoriga").addClass("active");
      $("#salaryModal").show();
    });
  $(".close-salary").on("click", function () {
    $("#salaryModal").hide();
    const salaryItem = $(".filter_item").eq(2);
    salaryItem.find(".pastga").addClass("active");
    salaryItem.find(".yuqoriga").removeClass("active");
  });

  $(".range-thumb").on("mousedown touchstart", function () {
    dragging = true;
  });
  $(document).on("mouseup touchend", function () {
    dragging = false;
  });
  $(document).on("mousemove touchmove", function (e) {
    if (!dragging) return;
    const track = $(".range-track");
    const trackOffset = track.offset().left;
    const trackWidth = track.width();
    let clientX = e.pageX || e.originalEvent.touches[0].pageX;
    let percent = ((clientX - trackOffset) / trackWidth) * 100;
    percent = Math.max(0, Math.min(100, percent));
    let salary = minSalary + (percent / 100) * (maxSalary - minSalary);
    salary = Math.round(salary / 10000) * 10000;
    currentSalary = Math.max(minSalary, Math.min(maxSalary, salary));
    $("#salaryAmount").text(currentSalary.toLocaleString());
    $(".range-fill").css("width", percent + "%");
    $(".range-thumb").css("left", percent + "%");
    filterJobs();
  });

  // --- Apply button ---
  $("#Apply").on("click", function () {
    window.location.href = "jobsDetails.html";
  });

  // --- Checkbox active ---
  $(".checkbox_item").click(function () {
    $(".checkbox_item .check_icon img").removeClass("active");
    $(this).find("img").addClass("active");
  });

  // Filter tozalash tugmasi
  $(".close_total").on("click", function () {
    // 1. Tagslarni o'chirish
    $(".keys_item").remove();
    updateCounter();

    // 2. Location icons reset
    resetLocationIcons();

    // 3. Salary reset
    currentSalary = maxSalary;
    $("#salaryAmount").text(currentSalary.toLocaleString());
    $(".range-fill").css("width", "100%");
    $(".range-thumb").css("left", "100%");

    // 4. Search input tozalash
    $("#searchInput").val("");
    $(".icon.clear").hide();

    // 5. Listni filter orqali qayta render qilish
    filterJobs();
  });

  // --- Category modal open ---
  $(".filter_item")
    .eq(1)
    .on("click", function () {
      $(this).find(".pastga").removeClass("active");
      $(this).find(".yuqoriga").addClass("active");

      $("#categoryModal, #categoryBackdrop").addClass("active");
    });

  // --- Category modal close (X) ---
  $(".close-category").on("click", closeCategoryModal);

  // --- Close by backdrop ---
  $("#categoryBackdrop").on("click", closeCategoryModal);

  function closeCategoryModal() {
    $("#categoryModal, #categoryBackdrop").removeClass("active");

    const categoryItem = $(".filter_item").eq(1);
    categoryItem.find(".pastga").addClass("active");
    categoryItem.find(".yuqoriga").removeClass("active");
  }

  // Category tag click
  // Category tag click
  $("#categoryModal .tag")
    .off("click")
    .on("click", function (e) {
      e.stopPropagation(); // eventni yuqoriga tarqalishini to'xtatish
      const value = $(this).text().trim().toLowerCase();

      // Duplicate category tekshirish
      const exists = $(".keys_item").filter(function () {
        return (
          $(this).data("type") === "category" && $(this).data("value") === value
        );
      }).length;

      if (exists) return;

      $(".filter_keys").append(`
      <div class="keys_item" data-type="category" data-value="${value}">
        <span>${value}</span>
        <img src="./images/filterClose.png" alt="remove" />
      </div>
    `);

      updateCounter();
      closeCategoryModal();
      filterJobs();
    });

  function filterJobs() {
    const searchVal = $("#searchInput").val().toLowerCase();
    const tags = $(".keys_item span")
      .map(function () {
        return $(this).text().toLowerCase();
      })
      .get();

    $(".filters_list .list_item").each(function () {
      const $this = $(this);
      const title = $this.data("title").toLowerCase();
      const company = $this.find(".title span").text().toLowerCase();
      const employment = $this.data("employment").toLowerCase();
      const location = $this.data("location").toLowerCase(); // <-- location
      const salaryNum = parseFloat($this.data("salary"));
      const category = $this.data("category").toLowerCase();

      let visible = true;

      // Search filter
      if (
        searchVal &&
        !title.includes(searchVal) &&
        !company.includes(searchVal)
      )
        visible = false;

      // Tags filter
      if (tags.length > 0) {
        const tagMatch = tags.some(
          (tag) =>
            title.includes(tag) ||
            company.includes(tag) ||
            employment.includes(tag) ||
            location.includes(tag) ||
            category.includes(tag)
        );
        if (!tagMatch) visible = false;
      }

      // Salary filter
      if (salaryNum > currentSalary) visible = false;

      $this.toggle(visible);
    });

    if ($(".filters_list .list_item:visible").length === 0)
      console.log("No jobs found");
  }
});
