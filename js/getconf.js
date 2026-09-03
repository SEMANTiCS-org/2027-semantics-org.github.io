function apply_conf(isindex = false) {
  var base = "../";

  if (isindex) {
    base = "";
  }

  $.get(base + "conf.ini", function(data) {
    var lines = data.split("\n");
    var index = {};

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();

      if (line[0] == "#" || line == "") {
        continue;
      }

      var parts = line.split("=");

      if (parts.length >= 2) {
        index[parts[0].trim()] = parts.slice(1).join("=").trim();
      }
    }

    console.log(index);

    // Replace __baseurl__ in all src and href attributes
    if (index["baseurl"]) {
      document.querySelectorAll("[src], [href]").forEach(function(el) {
        ["src", "href"].forEach(function(attr) {
          var value = el.getAttribute(attr);

          if (value && value.includes("__baseurl__")) {
            el.setAttribute(
              attr,
              value.replace(/__baseurl__/g, index["baseurl"])
            );
          }
        });
      });
    }
  });
}


function apply_conf_onfunc(callbkfunc, isindex = false) {
  var base = "../";

  if (isindex) {
    base = "";
  }

  $.get(base + "conf.ini", function(data) {
    var lines = data.split("\n");
    var index = {};

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();

      if (line[0] == "#" || line == "") {
        continue;
      }

      var parts = line.split("=");

      if (parts.length >= 2) {
        index[parts[0].trim()] = parts.slice(1).join("=").trim();
      }
    }

    callbkfunc(index, isindex);
  });
}