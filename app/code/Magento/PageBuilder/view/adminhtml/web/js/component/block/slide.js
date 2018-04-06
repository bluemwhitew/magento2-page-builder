/*eslint-disable */
define(["mage/translate", "underscore", "Magento_PageBuilder/js/utils/color-converter", "Magento_PageBuilder/js/utils/directives", "Magento_PageBuilder/js/utils/number-converter", "Magento_PageBuilder/js/component/stage/structural/options/option", "Magento_PageBuilder/js/component/block/block"], function (_translate, _underscore, _colorConverter, _directives, _numberConverter, _option, _block) {
  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  var Slide =
  /*#__PURE__*/
  function (_Block) {
    _inheritsLoose(Slide, _Block);

    function Slide() {
      return _Block.apply(this, arguments) || this;
    }

    var _proto = Slide.prototype;

    /**
     * Get the options instance
     *
     * @returns {Options}
     */
    _proto.getOptions = function getOptions() {
      var options = _Block.prototype.getOptions.call(this);

      options.removeOption("move");
      return options;
    };
    /**
     * Get the slide wrapper styles for the storefront
     *
     * @returns {object}
     */


    _proto.getSlideStyles = function getSlideStyles(type) {
      var data = this.getData();

      var style = _underscore.clone(this.getStyle());

      var backgroundImage = "";

      if (type === "image") {
        backgroundImage = this.getImage() ? this.getStyle().backgroundImage : "none";
      }

      if (type === "mobileImage") {
        if (this.getMobileImage()) {
          backgroundImage = this.getStyle().mobileImage;
        } else {
          if (this.getImage()) {
            backgroundImage = this.getStyle().backgroundImage;
          } else {
            backgroundImage = "none";
          }
        }
      }

      return Object.assign(style, {
        backgroundImage: backgroundImage,
        backgroundSize: data.background_size,
        border: "",
        borderColor: "",
        borderRadius: "",
        borderWidth: "",
        marginBottom: "",
        marginLeft: "",
        marginRight: "",
        marginTop: "",
        paddingBottom: "",
        paddingLeft: "",
        paddingRight: "",
        paddingTop: ""
      });
    };
    /**
     * Get the slide overlay attributes for the storefront
     *
     * @returns {object}
     */


    _proto.getOverlayAttributes = function getOverlayAttributes() {
      var data = this.getData();
      var overlayColorAttr = "transparent";

      if (data.show_overlay !== "never_show") {
        if (data.overlay_color !== "" && data.overlay_color !== undefined) {
          overlayColorAttr = (0, _colorConverter.fromHex)(data.overlay_color, (0, _numberConverter.percentToDecimal)(data.overlay_transparency));
        }
      }

      return {
        "data-overlay-color": overlayColorAttr
      };
    };
    /**
     * Get the slide overlay styles for the storefront
     *
     * @returns {object}
     */


    _proto.getOverlayStyles = function getOverlayStyles() {
      var data = this.getData();
      var _data$margins_and_pad = data.margins_and_padding.padding,
          _data$margins_and_pad2 = _data$margins_and_pad.top,
          top = _data$margins_and_pad2 === void 0 ? 0 : _data$margins_and_pad2,
          _data$margins_and_pad3 = _data$margins_and_pad.right,
          right = _data$margins_and_pad3 === void 0 ? 0 : _data$margins_and_pad3,
          _data$margins_and_pad4 = _data$margins_and_pad.bottom,
          bottom = _data$margins_and_pad4 === void 0 ? 0 : _data$margins_and_pad4,
          _data$margins_and_pad5 = _data$margins_and_pad.left,
          left = _data$margins_and_pad5 === void 0 ? 0 : _data$margins_and_pad5;
      return {
        backgroundColor: this.getOverlayColorStyle().backgroundColor,
        minHeight: data.min_height + "px",
        paddingBottom: bottom + "px",
        paddingLeft: left + "px",
        paddingRight: right + "px",
        paddingTop: top + "px"
      };
    };
    /**
     * Get the overlay color style only for the storefront
     *
     * @returns {object}
     */


    _proto.getOverlayColorStyle = function getOverlayColorStyle() {
      var data = this.getData();
      var overlayColor = "transparent";

      if (data.show_overlay === "always" && data.overlay_color !== "" && data.overlay_color !== undefined) {
        overlayColor = (0, _colorConverter.fromHex)(data.overlay_color, (0, _numberConverter.percentToDecimal)(data.overlay_transparency));
      }

      return {
        backgroundColor: overlayColor
      };
    };
    /**
     * Get the slide content for the storefront
     *
     * @returns {string}
     */


    _proto.getContentHtml = function getContentHtml() {
      var data = this.getData();

      if (data.content === "" || data.content === undefined) {
        return;
      } else {
        return (0, _translate)(data.content);
      }
    };
    /**
     * Get the desktop (main) image attributes for the render
     *
     * @returns {object}
     */


    _proto.getImage = function getImage() {
      var data = this.getData();

      if (data.background_image === "" || data.background_image === undefined) {
        return false;
      }

      if (_underscore.isEmpty(data.background_image[0])) {
        return;
      }

      return (0, _directives.getImageUrl)(data.background_image);
    };
    /**
     * Get the mobile image attributes for the render
     *
     * @returns {object}
     */


    _proto.getMobileImage = function getMobileImage() {
      var data = this.getData();

      if (data.mobile_image === "" || data.mobile_image === undefined) {
        return false;
      }

      if (_underscore.isEmpty(data.mobile_image[0])) {
        return;
      }

      return (0, _directives.getImageUrl)(data.mobile_image);
    };
    /**
     * Get the link attributes for the render
     *
     * @returns {object}
     */


    _proto.getLinkAttribute = function getLinkAttribute() {
      var data = this.getData();
      var attribute = {};

      if (data.link_url !== "") {
        attribute.href = data.link_url;
      }

      if (data.open_in_new_tab === "1") {
        attribute.target = "_blank";
      }

      return attribute;
    };
    /**
     * Get the button style for the render
     *
     * @returns {object}
     */


    _proto.getButtonStyle = function getButtonStyle() {
      var data = this.getData();
      return {
        opacity: data.show_button === "always" ? "1" : "0",
        visibility: data.show_button === "always" ? "visible" : "hidden"
      };
    };
    /**
     * Get slide container style only for the storefront
     *
     * @returns {object}
     */


    _proto.getSlideContainerStyle = function getSlideContainerStyle() {
      var style = _underscore.clone(this.getStyle());

      return Object.assign(style, {
        backgroundImage: "",
        minHeight: "",
        padding: "",
        paddingBottom: "",
        paddingLeft: "",
        paddingRight: "",
        paddingTop: "",
        textAlign: ""
      });
    };
    /**
     * Return an array of options
     *
     * @returns {Array<Option>}
     */


    _proto.retrieveOptions = function retrieveOptions() {
      var options = _Block.prototype.retrieveOptions.call(this);

      var newOptions = options.filter(function (option) {
        return option.code !== "remove";
      });
      var removeClasses = ["remove-structural"];
      var removeFn = this.onOptionRemove;

      if (this.parent.children().length <= 1) {
        removeFn = function removeFn() {
          return;
        };

        removeClasses.push("disabled");
      }

      newOptions.push(new _option.Option(this, "remove", "<i class='icon-admin-pagebuilder-remove'></i>", (0, _translate)("Remove"), removeFn, removeClasses, 100));
      return newOptions;
    };

    return Slide;
  }(_block);

  return Slide;
});
//# sourceMappingURL=slide.js.map