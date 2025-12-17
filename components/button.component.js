// button.component.js fayli

function simpleButton(text, color, bgColor, options = {}, width) {
  // Default konfiguratsiya
  const config = {
    onClick: null,
    href: null,
    target: "_self",
    className: "",
    disabled: false,
    confirmMessage: null,
  };

  // Agar 4-parametr function bo'lsa
  if (typeof options === "function") {
    config.onClick = options;
  }
  // Agar obyekt bo'lsa
  else if (typeof options === "object") {
    $.extend(config, options);
  }

  const $btn = $("<button>", {
    text: text,
    class: config.className,
    css: {
      color: color,
      backgroundColor: bgColor,
      width: width,
      // height: "48px",
      padding: "16px 32px",
      border: "none",
      borderRadius: "40px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: config.disabled ? "not-allowed" : "pointer",
      opacity: config.disabled ? "0.6" : "1",
      transition: "all 0.3s ease",
    },
    disabled: config.disabled,
  });

  // Hover effekti (faqat disabled emas bo'lsa)
  if (!config.disabled) {
    $btn.hover(
      function () {
        $(this).css({
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        });
      },
      function () {
        $(this).css({
          transform: "translateY(0)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        });
      }
    );
  }

  // Click event handler
  $btn.on("click", function (e) {
    // Agar disabled bo'lsa
    if (config.disabled) {
      e.preventDefault();
      return false;
    }

    // Confirmation so'rash
    if (config.confirmMessage && !confirm(config.confirmMessage)) {
      e.preventDefault();
      return false;
    }

    // Agar href bo'lsa (sahifaga o'tish)
    if (config.href) {
      if (config.target === "_blank") {
        window.open(config.href, "_blank");
      } else {
        window.location.href = config.href;
      }

      // Agar onClick ham bo'lsa, uni ham ishga tushirish
      if (config.onClick && typeof config.onClick === "function") {
        config.onClick(e, $btn);
      }

      return true;
    }

    // Agar onClick function bo'lsa
    if (config.onClick && typeof config.onClick === "function") {
      return config.onClick(e, $btn);
    }
  });

  // ========== METODLAR ==========

  // Text o'zgartirish
  $btn.changeText = function (newText) {
    $(this).text(newText);
    return this;
  };

  // Text rangi o'zgartirish
  $btn.changeColor = function (newColor) {
    $(this).css("color", newColor);
    return this;
  };

  // Fon rangi o'zgartirish
  $btn.changeBgColor = function (newBgColor) {
    $(this).css("backgroundColor", newBgColor);
    return this;
  };
  $btn.changeWidth = function (newWidth) {
    $(this).css("width", newWidth);
    return this;
  };

  // O'lcham o'zgartirish
  $btn.setSize = function (width, height) {
    $(this).css({
      width: width,
      height: height,
      padding: "0",
    });
    return this;
  };

  // Disable qilish
  $btn.disable = function () {
    $(this).prop("disabled", true).css({
      opacity: "0.6",
      cursor: "not-allowed",
    });
    config.disabled = true;
    return this;
  };

  // Enable qilish
  $btn.enable = function () {
    $(this).prop("disabled", false).css({
      opacity: "1",
      cursor: "pointer",
    });
    config.disabled = false;
    return this;
  };

  // Icon qo'shish
  $btn.addIcon = function (iconClass, position = "left") {
    const $icon = $("<i>", {
      class: iconClass,
      css: {
        marginRight: position === "left" ? "8px" : "0",
        marginLeft: position === "right" ? "8px" : "0",
      },
    });

    if (position === "left") {
      $(this).prepend($icon);
    } else {
      $(this).append($icon);
    }

    return this;
  };

  // Class qo'shish
  $btn.addClass = function (className) {
    $(this).addClass(className);
    return this;
  };

  // Class olib tashlash
  $btn.removeClass = function (className) {
    $(this).removeClass(className);
    return this;
  };

  // URL o'rnatish
  $btn.setHref = function (url, target = "_self") {
    config.href = url;
    config.target = target;
    return this;
  };

  // Confirmation message o'rnatish
  $btn.setConfirm = function (message) {
    config.confirmMessage = message;
    return this;
  };

  // Config ni olish
  $btn.getConfig = function () {
    return $.extend({}, config, { text: text, color: color, bgColor: bgColor });
  };

  return $btn;
}

// Global qilish
if (typeof window !== "undefined") {
  window.simpleButton = simpleButton;
}
