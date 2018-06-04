/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import _ from "underscore";
import {DataObject} from "../../data-store";
import AttributeMapper from "../attribute-mapper";
import {ReadInterface} from "../read-interface";
import StyleAttributeMapper from "../style-attribute-mapper";

/**
 * @deprecated
 */
export default class Default implements ReadInterface {
    private attributeMapper: AttributeMapper = new AttributeMapper();
    private styleAttributeMapper: StyleAttributeMapper = new StyleAttributeMapper();

    /**
     * Read data, style and css properties from the element
     *
     * @param element HTMLElement
     * @returns {Promise<any>}
     */
    public read(element: HTMLElement): Promise<any> {
        const data: DataObject = {};
        const styleAttributes: DataObject = {};

        for (let i = 0; i < element.style.length; i ++) {
            const property: any = element.style.item(i);

            if (element.style[property] !== "") {
                styleAttributes[property] = element.style[property];
            }
        }

        const attributes: DataObject = {};
        Array.prototype.slice.call(element.attributes).forEach((item: {name: string, value: string}) => {
            attributes[item.name] = item.value;
        });

        _.extend(
            data,
            this.attributeMapper.fromDom(attributes),
            this.styleAttributeMapper.fromDom(styleAttributes),
        );

        Object.keys(element.dataset).map((key) => {
            if (element.dataset[key] !== "") {
                data[key.split(/(?=[A-Z])/).join("_").toLowerCase()] = element.dataset[key];
            }
        });

        // Copy the css classes into the data store, excluding the pagebuilder-ROLE class
        data.css_classes = element.className || "";
        data.css_classes = data.css_classes.toString().split(" ").filter((className) => {
            return className !== "pagebuilder-" + attributes["data-role"];
        }).join(" ");

        return new Promise((resolve: (data: object) => void) => {
            resolve(data);
        });
    }
}