import type {
  InjectionKey,
  Ref,
  ShallowRef,
  ComponentInternalInstance,
  Raw,
} from "vue";
import type {
  Map,
  Marker,
  MapEventType,
  SourceSpecification,
} from "maplibre-gl";
import type { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";

export const map = Symbol("map"),
  mapSymbol = map as InjectionKey<ShallowRef<Map | undefined>>,
  isLoadedSymbol = Symbol("isLoaded") as InjectionKey<Ref<boolean>>,
  isInitialized = Symbol("isInitialized"),
  isInitializedSymbol = isInitialized as InjectionKey<Ref<boolean>>,
  componentIdSymbol = Symbol("componentId") as InjectionKey<number>,
  sourceIdSymbol = Symbol("sourceId") as InjectionKey<string>,
  sourceLayerRegistry = Symbol(
    "sourceLayerRegistry",
  ) as InjectionKey<SourceLayerRegistry>,
  markerSymbol = Symbol("marker") as InjectionKey<
    ShallowRef<Marker | undefined>
  >;

export type PrefixedEvent<
  Prefix extends string
> = {
  [K in keyof MapEventType as K extends string ? `${Prefix}:${K}` : never]:
    (event: MapEventType[K] | any) => true;
};

export type MapPrefixedEvent = PrefixedEvent<"map">

export type UpdatePrefixedEvent = PrefixedEvent<"update">

export type MapUpdatePrefixedEvent = MapPrefixedEvent | UpdatePrefixedEvent

export interface MglEvent<T extends MapPrefixedEvent> {
  type: string;
  component: Raw<ComponentInternalInstance>;
  map: Map;
  event: T;
}

export type SourceOptionProps = SourceSpecification & { sourceId: string };
