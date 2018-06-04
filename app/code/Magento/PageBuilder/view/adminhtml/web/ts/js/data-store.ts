/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import $ from "jquery";

interface DataStoreEvent {
    state: DataObject;
}

export interface DataObject {
    // State object can only contain primitives
    [key: string]: undefined | null | string | number | boolean | any[];
}

export default class DataStore {
    private state: DataObject = {};
    private events: JQuery.PlainObject = $({});

    /**
     * Retrieve data from the state for an editable area
     */
    public get(): DataObject {
        return this.state;
    }

    /**
     * Update the state for an individual editable area
     *
     * @param data
     * @param key
     */
    public update(data: DataObject | undefined | null | string | number | boolean, key?: string | number): void {
        const storeState = key ? this.state : data;
        if (key) {
            storeState[key] = data;
        }
        this.state = storeState;
        this.emitState();
    }

    /**
     * Remove item from DataStore
     *
     * @param {string | number} key
     */
    public unset(key: string | number): void {
        const storeState = this.state;
        delete storeState[key];
        this.update(storeState);
    }

    /**
     * Subscribe to data changes on an editable area
     *
     * @param {(state: DataObject, event: Event) => void} handler
     */
    public subscribe(handler: (state: DataObject, event: Event) => void): void {
        this.events.on("state", (event: Event, data: DataStoreEvent) => {
            handler(data.state, event);
        });
    }

    /**
     * Emit state updates through events
     */
    private emitState() {
        this.events.trigger("state", { state: this.state });
    }
}