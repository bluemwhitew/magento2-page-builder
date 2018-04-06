/*eslint-disable */
define(["knockout", "ko-draggable", "ko-sortable", "mage/translate", "underscore", "Magento_PageBuilder/js/component/config", "Magento_PageBuilder/js/component/event-bus", "Magento_PageBuilder/js/component/stage/panel/group", "Magento_PageBuilder/js/component/stage/panel/group/block", "Magento_PageBuilder/js/component/stage/previews"], function (_knockout, _koDraggable, _koSortable, _translate, _underscore, _config, _eventBus, _group, _block, _previews) {
  /**
   * Copyright © Magento, Inc. All rights reserved.
   * See COPYING.txt for license details.
   */
  var Panel =
  /*#__PURE__*/
  function () {
    function Panel(parent) {
      this.groups = _knockout.observableArray([]);
      this.searchResults = _knockout.observableArray([]);
      this.isCollapsed = _knockout.observable(false);
      this.isVisible = _knockout.observable(false);
      this.searching = _knockout.observable(false);
      this.searchValue = _knockout.observable("");
      this.searchPlaceholder = (0, _translate)("Find items");
      this.searchNoResult = (0, _translate)("Nothing found");
      this.fullScreenTitle = (0, _translate)("Full Screen");
      this.searchTitle = (0, _translate)("Clear Search");
      this.parent = void 0;
      this.id = void 0;
      this.template = "Magento_PageBuilder/component/stage/panel.html";
      this.parent = parent;
      this.id = this.parent.id;
      this.initListeners();
      (0, _previews.load)();
    }
    /**
     * Init listeners
     */


    var _proto = Panel.prototype;

    _proto.initListeners = function initListeners() {
      var _this = this;

      _eventBus.on("stage:ready:" + this.id, function () {
        _this.populateContentBlocks();

        _this.isVisible(true);
      });
    };
    /**
     * Return the template string
     *
     * @returns {string}
     */


    _proto.getTemplate = function getTemplate() {
      return this.template;
    };
    /**
     * Conduct a search on the available content blocks,
     * and find matches for beginning of words.
     *
     * @param self
     * @param event
     */


    _proto.search = function search(self, event) {
      this.searchValue(event.currentTarget.value.toLowerCase());

      if (this.searchValue() === "") {
        this.searching(false);
      } else {
        this.searching(true);
        this.searchResults(_underscore.map(_underscore.filter(_config.getInitConfig("content_types"), function (contentBlock) {
          var regEx = new RegExp("\\b" + self.searchValue(), "gi");
          var matches = !!contentBlock.label.toLowerCase().match(regEx);
          return matches && contentBlock.is_visible === true;
        }), function (contentBlock, identifier) {
          // Create a new instance of GroupBlock for each result
          return new _block.Block(identifier, contentBlock);
        }));
      }
    };
    /**
     * Populate the panel with the content blocks
     */


    _proto.populateContentBlocks = function populateContentBlocks() {
      var _this2 = this;

      var groups = _config.getInitConfig("groups");

      var contentBlocks = _config.getInitConfig("content_types"); // Verify the configuration contains the required information


      if (groups && contentBlocks) {
        // Iterate through the groups creating new instances with their associated content blocks
        _underscore.each(groups, function (group, id) {
          // Push the group instance into the observable array to update the UI
          _this2.groups.push(new _group.Group(id, group, _underscore.map(_underscore.where(contentBlocks, {
            group: id,
            is_visible: true
          }),
          /* Retrieve content blocks with group id */
          function (contentBlock, identifier) {
            var groupBlock = new _block.Block(identifier, contentBlock);
            return groupBlock;
          })));
        }); // Display the panel


        this.isVisible(true); // Open first group

        var hasGroups = 0 in this.groups();

        if (hasGroups) {
          this.groups()[0].active(true);
        }
      } else {
        console.warn("Configuration is not properly initialized, please check the Ajax response.");
      }
    };
    /**
     * Traverse up to the WYSIWYG component and set as full screen
     */


    _proto.fullScreen = function fullScreen() {
      _eventBus.trigger("pagebuilder:toggleFullScreen:" + this.parent.id, {});
    };
    /**
     * Collapse the panel into the side of the UI
     */


    _proto.collapse = function collapse() {
      this.isCollapsed(!this.isCollapsed());
    };
    /**
     * Clear Search Results
     */


    _proto.clearSearch = function clearSearch() {
      this.searchValue("");
      this.searching(false);
    };

    return Panel;
  }();

  return Panel;
});
//# sourceMappingURL=panel.js.map