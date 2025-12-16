$.fn.baseInput = function (options) {
  const settings = $.extend(
    {
      label: "",
      placeholder: "",
      name: "",
      required: false,
    },
    options
  );

  return this.each(function () {
    $(this).append(`
      <div class="form-group">
        <label>
          ${settings.label}${settings.required ? " *" : ""}
        </label>
        <input 
          type="text" 
          name="${settings.name}" 
          placeholder="${settings.placeholder}"
        />
      </div>
    `);
  });
};
