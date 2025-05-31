import type { ComponentInternalInstance, Raw } from "vue";
import type { Map, MapEventType, LngLat } from "maplibre-gl";
import type { MglEvent, MapPrefixedEvent } from "@/lib/types";
import { MapLayerEmits } from "./layer.lib";

export type MapEventHandler<T extends MapPrefixedEvent> = (
  e: T,
) => void;

export type MapEvent<T extends keyof MapEventType> = `map:${T}` | `update:${string}`;

// export type EventType = `map:${keyof MapEventType}`

export const MAP_EVENT_TYPES: Array<keyof MapEventType> = [
  "error",
  "load",
  "idle",
  "remove",
  "render",
  "resize",
  "webglcontextlost",
  "webglcontextrestored",
  "dataloading",
  "data",
  "tiledataloading",
  "sourcedataloading",
  "styledataloading",
  "sourcedata",
  "styledata",
  "styleimagemissing",
  "dataabort",
  "sourcedataabort",
  "boxzoomcancel",
  "boxzoomstart",
  "boxzoomend",
  "touchcancel",
  "touchmove",
  "touchend",
  "touchstart",
  "click",
  "contextmenu",
  "dblclick",
  "mousemove",
  "mouseup",
  "mousedown",
  "mouseout",
  "mouseover",
  "movestart",
  "move",
  "moveend",
  "zoomstart",
  "zoom",
  "zoomend",
  "rotatestart",
  "rotate",
  "rotateend",
  "dragstart",
  "drag",
  "dragend",
  "pitchstart",
  "pitch",
  "pitchend",
  "wheel",
  "terrain",
  "cooperativegestureprevented",
] as const;

// export type MapEventEmits<T extends keyof MapEventType = keyof MapEventType> = {
//   [K in T as MapEvent<K>]: (event: MapEventType[T]) => true
// }
export type MapEventEmits<T extends keyof MapEventType> = {
  [K in T as K extends `update:${string}` ? K : `map:${K}`]: (event: MapEventType[K]) => true
};

export type PrefixedEvent<
  Prefix extends string,
  // EventTypeMap extends Record<string, any>
> = {
  // K will be 'error', 'load', etc.
  // We ensure K is a string to use it in the template literal.
  [K in keyof MapEventType as K extends string ? `${Prefix}:${K}` : never]:
    (event: MapEventType[K]) => true;
};

// export const MEmits : PrefixedEventEmits<"map"> = {
//   "map:boxzoomcancel": (event) => true,
//   "map:boxzoomend": (event) => true
// }

// export const MapEventEmits: MapEventEmits<keyof MapEventType> = {
export const MapEventEmits : PrefixedEvent<"map"> = {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "map:error": (event) => true,
    // "map:error": (event: MapEventType["error"]) => true,
    "map:load": (event) => true,
    "map:idle": (event) => true,
    "map:remove": (event) => true,
    "map:render": (event) => true,
    "map:resize": (event) => true,
    "map:webglcontextlost": (event) => true,
    "map:webglcontextrestored": (event) => true,
    "map:dataloading": (event) => true,
    "map:data": (event) => true,
    "map:tiledataloading": (event) => true,
    "map:sourcedataloading": (event) => true,
    "map:styledataloading": (event) => true,
    "map:sourcedata": (event) => true,
    "map:styledata": (event) => true,
    "map:styleimagemissing": (event) => true,
    "map:dataabort": (event) => true,
    "map:sourcedataabort": (event) => true,
    "map:boxzoomcancel": (event) => true,
    "map:boxzoomstart": (event) => true,
    "map:boxzoomend": (event) => true,
    "map:touchcancel": (event) => true,
    "map:touchmove": (event) => true,
    "map:touchend": (event) => true,
    "map:touchstart": (event) => true,
    "map:click": (event) => true,
    "map:contextmenu": (event) => true,
    "map:dblclick": (event) => true,
    "map:mousemove": (event) => true,
    "map:mouseup": (event) => true,
    "map:mousedown": (event) => true,
    "map:mouseout": (event) => true,
    "map:mouseover": (event) => true,
    "map:movestart": (event) => true,
    "map:move": (event) => true,
    "map:moveend": (event) => true,
    "map:zoomstart": (event) => true,
    "map:zoom": (event) => true,
    "map:zoomend": (event) => true,
    "map:rotatestart": (event) => true,
    "map:rotate": (event) => true,
    "map:rotateend": (event) => true,
    "map:dragstart": (event) => true,
    "map:drag": (event) => true,
    "map:dragend": (event) => true,
    "map:pitchstart": (event) => true,
    "map:pitch": (event) => true,
    "map:pitchend": (event) => true,
    "map:wheel": (event) => true,
    "map:terrain": (event) => true,
    "map:cooperativegestureprevented": (event) => true,
    "map:projectiontransition": (event) => true,
    /**
     * Center property updated
     */
    // "update:center": (value: LngLat) => true,
    // /**
    //  * Zoom property updated
    //  */
    // "update:zoom": (value: Number) => true,
    // /**
    //  * Pitch property updated
    //  */
    // "update:pitch": (value: number) => true,
    // /**
    //  * Bearing property updated
    //  */
    // "update:bearing": (value: number) => true,
  }

export function createEventHandler<T extends keyof MapPrefixedEvent>(
  component: Raw<ComponentInternalInstance>,
  map: Map,
  ctx: {
    emit: (event: T, payload: MglEvent<MapPrefixedEvent>) => void;
  },
  eventName: T,
): MapEventHandler<MapPrefixedEvent> {
  return (payload: MapPrefixedEvent[T]) =>
    ctx.emit(eventName, {
      type: payload,
      map,
      component,
      event: payload,
    });
}
