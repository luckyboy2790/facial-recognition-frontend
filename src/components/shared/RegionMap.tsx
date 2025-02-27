import { useState } from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from 'react-simple-maps'
import classNames from '@/utils/classNames'
import { PatternCircles } from '@visx/pattern'
import WorldMap from '@/assets/maps/world-countries-sans-antarctica.json'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import type { Dispatch, ReactNode, SetStateAction } from 'react'

type MarkerCallback = (markerComponet: typeof Marker) => ReactNode

type MapDataProp = {
    name: string
    value?: string | number
    color?: string
}[]

type RegionMapProps = {
    data: MapDataProp
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSource?: string | Record<string, any> | string[]
    valueSuffix?: string
    valuePrefix?: string
    marker?: MarkerCallback
    hoverable?: boolean
}

type MapProps = Omit<RegionMapProps, 'valueSuffix' | 'valuePrefix'> & {
    prefix?: string
    suffix?: string
}

type MapChartProps = MapProps & {
    setTooltipContent: Dispatch<SetStateAction<string>>
}

const geoUrl = WorldMap

const getRegionValue = (
    name: unknown,
    data: MapDataProp,
    suffix = '',
    prefix = '',
) => {
    if (data.length > 0 || name) {
        for (let i = 0; i < data.length; i++) {
            const elm = data[i]
            if (name === elm.name) {
                return `${elm.name} - ${prefix}${elm.value}${suffix}`
            }
        }
        return ''
    }
    return ''
}

const MapChart = (props: MapChartProps) => {
    const {
        setTooltipContent,
        data,
        mapSource,
        suffix,
        prefix,
        marker,
        hoverable = true,
    } = props

    return (
        <ComposableMap
            style={{ transform: 'translateY(20px)' }}
            data-tip=""
            height={450}
            projectionConfig={{ scale: 170 }}
        >
            <PatternCircles
                id="map-dots"
                height={6}
                width={6}
                className="fill-gray-300 dark:fill-gray-500 "
                strokeWidth={1}
                background="transparent"
            />
            <PatternCircles
                id="map-dots-hover"
                height={6}
                width={6}
                className="fill-gray-400 dark:fill-gray-300 "
                strokeWidth={1}
                background="transparent"
            />
            <Geographies geography={mapSource}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        const geoName = geo.properties.name
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                strokeWidth={2}
                                className={classNames('stroke-transparent')}
                                fill="url('#map-dots')"
                                style={
                                    hoverable
                                        ? {
                                              hover: {
                                                  fill: "url('#map-dots-hover')",
                                              },
                                          }
                                        : {}
                                }
                                onMouseEnter={() => {
                                    setTooltipContent(
                                        getRegionValue(
                                            geoName,
                                            data,
                                            suffix,
                                            prefix,
                                        ),
                                    )
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent('')
                                }}
                            />
                        )
                    })
                }
            </Geographies>
            {marker?.(Marker)}
        </ComposableMap>
    )
}

const Map = (props: MapProps) => {
    const [content, setContent] = useState('')
    return (
        <>
            <MapChart {...props} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </>
    )
}

const RegionMap = (props: RegionMapProps) => {
    const {
        data = [],
        mapSource = geoUrl,
        valueSuffix,
        valuePrefix,
        marker,
        hoverable,
    } = props

    return (
        <Map
            data={data}
            mapSource={mapSource}
            prefix={valuePrefix}
            suffix={valueSuffix}
            marker={marker}
            hoverable={hoverable}
        />
    )
}

export default RegionMap
