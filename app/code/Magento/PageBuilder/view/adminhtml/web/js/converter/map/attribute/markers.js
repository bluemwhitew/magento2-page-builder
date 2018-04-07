/*eslint-disable */
define([], function () {
  /**
   * Copyright © Magento, Inc. All rights reserved.
   * See COPYING.txt for license details.
   */
  var Markers =
  /*#__PURE__*/
  function () {
    function Markers() {}

    var _proto = Markers.prototype;

    /**
     * Convert value to internal format
     *
     * @param value string
     * @returns {string | object}
     */
    _proto.fromDom = function fromDom(value) {
      return;
    };
    /**
     * Convert value to knockout format
     *
     * @param name string
     * @param data Object
     * @returns {string | object}
     */


    _proto.toDom = function toDom(name, data) {
      var content = data[name];

      if (typeof content === "string" && content !== "") {
        content = JSON.parse(content);
      }

      if (content && Object.keys(content).length) {
        var result = {
          lat: content.lat,
          lng: content.lng
        };
        return JSON.stringify([result]);
      }

      return JSON.stringify([]);
    };

    return Markers;
  }();

  return Markers;
});
//# sourceMappingURL=markers.js.map
