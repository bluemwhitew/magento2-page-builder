/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import {ElementConverterInterface} from "../../element-converter-interface";

export default class Zoom implements ElementConverterInterface {
    /**
     * Convert value to internal format
     *
     * @param value string
     * @returns {string | object}
     */
    public fromDom(value: string): string | object {
        return;
    }

    /**
     * Convert value to knockout format
     *
     * @param name string
     * @param data Object
     * @returns {string | object}
     */
    public toDom(name: string, data: object): string | object {
        if (data[name]) {
            let content = data[name];
            if (typeof content === "string" && content !== "") {
                content = JSON.parse(content);
            }
            return content.zoom;
        }
        return;
    }
}
