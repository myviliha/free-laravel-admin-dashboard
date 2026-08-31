/* VUI for HTML: what an exported page cannot do on its own. No dependencies.
 *
 *   <script src="vui.js" defer></script>
 *
 * Keyed on attributes the markup already carries:
 *
 *   [data-vui-open]     opens the <dialog> it names, as a modal
 *   [data-vui-dismiss]  closes its dialog or menu, or removes its closest [data-vui-toast]
 *   [data-vui-parent]   filters a <select> by another's value, matching data-vui-when
 *   [data-vui-menu]     opens the panel it names; an outside click closes it
 *   [data-vui-theme]    toggles .dark on the document
 *   [data-vui-collapse] collapses the sidebar
 *   [aria-controls]     any button that says what it expands
 *   role=radio|switch   moves the control and everything in it styled off data-state
 *
 * Everything else is HTML and CSS. Before adding here, check whether an element already does it.
 */
(function () {
  "use strict";

  function isChecked(control) {
    return control.getAttribute("aria-checked") === "true";
  }

  // Move a radio or a switch, and everything inside it that is styled off the same state.
  function setChecked(control, next) {
    if (control.getAttribute("role") === "radio" && next) {
      var group = control.closest('[role="radiogroup"]') || document;
      var siblings = group.querySelectorAll('[role="radio"]');
      for (var i = 0; i < siblings.length; i += 1) {
        if (siblings[i] !== control) mark(siblings[i], false);
      }
    }
    mark(control, next);
    // A change event, so a page can react without knowing this file exists.
    control.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  }

  function mark(control, next) {
    var state = next ? "checked" : "unchecked";
    control.setAttribute("aria-checked", next ? "true" : "false");
    control.setAttribute("data-state", state);
    // The indicator and the thumb hold their own copy, and the CSS reads theirs.
    var inner = control.querySelectorAll("[data-state]");
    for (var i = 0; i < inner.length; i += 1) inner[i].setAttribute("data-state", state);
  }

  // The keyboard, because an ARIA widget owes one.
  document.addEventListener("keydown", function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var control = target.closest('[role="switch"], [role="radio"]');
    if (!control || control.hasAttribute("disabled")) return;
    var isRadio = control.getAttribute("role") === "radio";

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setChecked(control, isRadio ? true : !isChecked(control));
      return;
    }

    // Arrows move within the group and check as they go, as the pattern requires.
    if (!isRadio) return;
    var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    var group = control.closest('[role="radiogroup"]');
    if (!group) return;
    var items = [];
    var all = group.querySelectorAll('[role="radio"]');
    for (var i = 0; i < all.length; i += 1) {
      if (!all[i].hasAttribute("disabled")) items.push(all[i]);
    }
    if (items.length === 0) return;
    event.preventDefault();
    var at = items.indexOf(control);
    var next = items[(at + step + items.length) % items.length];
    setChecked(next, true);
    if (next instanceof HTMLElement) next.focus();
  });

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    var opener = target.closest("[data-vui-open]");
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute("data-vui-open"));
      // showModal gives the focus trap, backdrop and Escape free: the whole reason
      // to use <dialog> rather than a div.
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      return;
    }

    // Disclosure: any button that says what it controls.
    var toggle = target.closest("[aria-expanded][aria-controls]");
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute("aria-controls"));
      if (panel) {
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
        panel.classList.toggle("grid-rows-[1fr]", !isOpen);
        panel.classList.toggle("grid-rows-[0fr]", isOpen);
        if (isOpen) {
          panel.setAttribute("aria-hidden", "true");
          panel.setAttribute("inert", "");
        } else {
          panel.removeAttribute("aria-hidden");
          panel.removeAttribute("inert");
        }
        return;
      }
    }

    // The theme switch.
    // The route progress bar, first half.
    var link = target.closest("a");
    if (link && !event.defaultPrevented && event.button === 0) {
      var mods = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      var href = link.getAttribute("href") || "";
      var external = link.target === "_blank" || link.hasAttribute("download");
      var sameDoc = href === "" || href.charAt(0) === "#";
      var offSite = /^[a-z]+:/i.test(href) && link.hostname !== location.hostname;
      if (!mods && !external && !sameDoc && !offSite) {
        startProgress("vui-route-progress 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards");
        try {
          sessionStorage.setItem("vui-navigating", "1");
        } catch (_) {
          // Private mode can refuse storage. Only the arrival flourish is skipped.
        }
      }
    }

    // Anchored menus, one open at a time.
    var menuTrigger = target.closest("[data-vui-menu]");
    var openMenus = document.querySelectorAll("[data-vui-menu-open]");
    for (var m = 0; m < openMenus.length; m++) {
      var panelId = openMenus[m].getAttribute("data-vui-menu");
      // The clicked one is handled below, so it toggles shut rather than reopening.
      if (openMenus[m] === menuTrigger) continue;
      // Inside a panel keeps it open. A single select is the exception: choosing there ends it.
      var own = panelId && document.getElementById(panelId);
      var done = target.closest('[data-slot="select-content"] [role="option"]');
      if (own && own.contains(target) && !done) continue;
      openMenus[m].removeAttribute("data-vui-menu-open");
      openMenus[m].setAttribute("aria-expanded", "false");
      var other = panelId && document.getElementById(panelId);
      if (other) other.hidden = true;
    }
    if (menuTrigger) {
      var id = menuTrigger.getAttribute("data-vui-menu");
      var panel = id && document.getElementById(id);
      if (panel) {
        var nowOpen = panel.hidden;
        panel.hidden = !nowOpen;
        menuTrigger.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        if (nowOpen) menuTrigger.setAttribute("data-vui-menu-open", "");
        else menuTrigger.removeAttribute("data-vui-menu-open");
        return;
      }
    }

    // The sidebar rail: one attribute, and free-demo.css carries the rest.
    var collapse = target.closest("[data-vui-collapse]");
    if (collapse) {
      var railOn = document.documentElement.toggleAttribute("data-vui-collapsed");
      // Shut every group first: an open one throws a flyout across the rail.
      if (railOn) {
        var groups = document.querySelectorAll("aside nav [aria-expanded='true'][aria-controls]");
        for (var g = 0; g < groups.length; g++) {
          var box = document.getElementById(groups[g].getAttribute("aria-controls"));
          groups[g].setAttribute("aria-expanded", "false");
          if (box) {
            box.setAttribute("aria-hidden", "true");
            box.setAttribute("inert", "");
          }
        }
      }
      collapse.setAttribute("aria-expanded", railOn ? "false" : "true");
      collapse.setAttribute("aria-label", railOn ? "Expand the sidebar" : "Collapse the sidebar");
      return;
    }

    var themeSwitch = target.closest("[data-vui-theme]");
    if (themeSwitch) {
      var isDark = document.documentElement.classList.toggle("dark");
      themeSwitch.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeSwitch.setAttribute(
        "aria-label",
        isDark ? "Switch to the light theme" : "Switch to the dark theme",
      );
      return;
    }

    // Radio groups and switches, which had no behaviour at all (PD-186).
    var toggle = target.closest('[role="switch"], [role="radio"]');
    if (toggle && !toggle.hasAttribute("disabled")) {
      setChecked(toggle, toggle.getAttribute("role") === "radio" ? true : !isChecked(toggle));
      return;
    }

    var dismiss = target.closest("[data-vui-dismiss]");
    if (dismiss) {
      var dialogParent = dismiss.closest("dialog");
      if (dialogParent) {
        dialogParent.close();
        return;
      }
      // A panel closes; a toast leaves. The note above the export says why.
      var owner = dismiss.closest('[role="menu"]');
      if (owner) {
        owner.hidden = true;
        var opener = document.querySelector('[data-vui-menu="' + owner.id + '"]');
        if (opener) {
          opener.setAttribute("aria-expanded", "false");
          opener.removeAttribute("data-vui-menu-open");
        }
        return;
      }
      var card = dismiss.closest("[data-vui-toast]") || dismiss.parentElement;
      if (card) card.remove();
    }
  });

  // Dependent selects: the second list shows only what the first list's value allows.
  // One track, one bar, replaced rather than restarted.
  function startProgress(animation) {
    var existing = document.querySelector("[data-vui-progress]");
    if (existing) existing.remove();
    var track = document.createElement("div");
    track.setAttribute("data-vui-progress", "");
    track.setAttribute("aria-hidden", "true");
    track.className = "pointer-events-none fixed inset-x-0 top-0 z-[300] h-0.5";
    var bar = document.createElement("div");
    bar.className = "h-full w-full origin-left bg-primary";
    bar.style.animation = animation;
    track.appendChild(bar);
    document.body.appendChild(track);
    return track;
  }

  // The arrival half.
  var navigated = null;
  try {
    navigated = sessionStorage.getItem("vui-navigating");
    if (navigated) sessionStorage.removeItem("vui-navigating");
  } catch (_) {
    navigated = null;
  }
  if (navigated) {
    var finished = startProgress("vui-route-progress-done 320ms ease-out forwards");
    setTimeout(function () {
      finished.remove();
    }, 360);
  }

  var dependents = document.querySelectorAll("[data-vui-parent]");
  for (var i = 0; i < dependents.length; i++) {
    (function (child) {
      var parent = document.getElementById(child.getAttribute("data-vui-parent"));
      if (!parent) return;
      var options = child.querySelectorAll("option[data-vui-when]");
      function sync() {
        var first = null;
        for (var j = 0; j < options.length; j++) {
          var matches = options[j].getAttribute("data-vui-when") === parent.value;
          // hidden alone is not enough: Safari still selects a hidden option.
          options[j].hidden = !matches;
          options[j].disabled = !matches;
          if (matches && !first) first = options[j];
        }
        // Or the child keeps a value its parent no longer allows.
        if (first && (child.selectedOptions.length === 0 || child.selectedOptions[0].disabled)) {
          child.value = first.value;
        }
      }
      parent.addEventListener("change", sync);
      sync();
    })(dependents[i]);
  }

  // Escape closes an open menu and returns focus to its trigger. A div gets neither free.
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var open = document.querySelectorAll("[data-vui-menu-open]");
    for (var k = 0; k < open.length; k++) {
      var panel = document.getElementById(open[k].getAttribute("data-vui-menu"));
      if (panel) panel.hidden = true;
      open[k].removeAttribute("data-vui-menu-open");
      open[k].setAttribute("aria-expanded", "false");
      open[k].focus();
    }
  });
})();
