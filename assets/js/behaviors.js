let behaviors = {
  "tei":{
    // Overrides the default ptr behavior, displaying a short link
    "ptr": function(elt) {
      var link = document.createElement("a");
      link.innerHTML = elt.getAttribute("target").replace(/https?:\/\/([^\/]+)\/.*/, "$1");
      link.href = elt.getAttribute("target");
      return link;
    },
    "gap": [
      ["[unit=lines]", function(elt) {
        let span = document.createElement("span");
        span.innerHTML = this.repeat(
          "<span style=\"display:block;\">*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*</span>", 
          Number.parseInt(elt.getAttribute("quantity")));
        return span;
      }],
      ["[unit=character]", function(elt) {
        let span = document.createElement("span");
        span.innerHTML = this.repeat("*", Number.parseInt(elt.getAttribute("quantity")));
        return span;
      }],
      ["_", ["<span>*</span>"]]
    ],
    "handDesc": function(e) {
      let result = document.createElement("span");
      if (parseInt(e.getAttribute("hands")) > 1) {
        result.innerHTML = "hands: " + e.innerHTML;
      } else {
        result.innerHTML = "hand: " + e.innerHTML;
      }
      return result;
    },
    "l": function(elt) {
      this.add_anchor(elt);
    },
    "supplied": ["&lt;","&gt;"],
    "table": function(elt) {
      let table = document.createElement("table");
      table.innerHTML = elt.innerHTML;
      if (table.firstElementChild.localName == "tei-head") {
        let head = table.firstElementChild;
        head.remove();
        let caption = document.createElement("caption");
        caption.innerHTML = head.innerHTML;
        table.appendChild(caption);
      }
      for (let row of Array.from(table.querySelectorAll("tei-row"))) {
        let tr = document.createElement("tr");
        tr.innerHTML = row.innerHTML;
        for (let attr of Array.from(row.attributes)) {
          tr.setAttribute(attr.name, attr.value);
        }
        row.parentElement.replaceChild(tr, row);
      }
      for (let cell of Array.from(table.querySelectorAll("tei-cell"))) {
        let td = document.createElement("td");
        if (cell.hasAttribute("cols")) {
          td.setAttribute("colspan", cell.getAttribute("cols"));
        }
        td.innerHTML = cell.innerHTML;
        for (let attr of Array.from(cell.attributes)) {
          td.setAttribute(attr.name, attr.value);
        }
        cell.parentElement.replaceChild(td, cell);
      }
      this.hideContent(elt, true);
      elt.appendChild(table);
    },
    "witDetail": function(elt) {
      var content = document.createElement("span");
      if (elt.hasAttribute("data-empty")) {
        if (elt.getAttribute("type") == "correction-altered") {
          content.innerHTML = " (p.c.) "
        }
        if (elt.getAttribute("type") == "correction-original") {
          content.innerHTML = " (a.c.) "
        }
      } else {
        content.innerHTML = " (" + elt.innerHTML + ") ";
      }
      return content;
    }
  },
  "functions": {
    "add_anchor": function(elt) {
      if (elt.hasAttribute("data-citation")) {
        let a = document.createElement("a");
        a.setAttribute("name", elt.getAttribute("data-citation"));
        elt.prepend(a);
      }
    }
  }
};